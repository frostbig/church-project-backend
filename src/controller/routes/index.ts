import { Request, Response } from "express";
import { Meet, Member, Person, Role } from "../../models";
import { serverResponse } from "../../utils/serverResponse";
import { sendEmails } from "../../utils/mail";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/token";

export const getAllMeets = async (req: Request, res: Response) => {
  const allMeets = await Meet.find().catch(() => {
    return null;
  });
  allMeets
    ? serverResponse(res, "all meet obtained successfully", allMeets)
    : serverResponse(res, "all roles not found");
};

export const getAllRoles = async (req: Request, res: Response) => {
  const allRoles = await Role.find().catch(() => {
    return null;
  });
  allRoles
    ? serverResponse(res, "all roles obtained successfully", allRoles)
    : serverResponse(res, "all roles not found");
};

export const getAllMembers = async (req: Request, res: Response) => {
  const allMembers = await Member.find().catch(() => {
    return null;
  });
  allMembers
    ? serverResponse(res, "all member obtained successfully", allMembers)
    : serverResponse(res, "all member not obtained");
};

export const postMember = async (req: Request, res: Response) => {
  const { body } = req;
  const newMember = new Member(body);
  await newMember.save().catch(() => {
    return null;
  });
  newMember
    ? serverResponse(res, "member create successfuly", newMember)
    : serverResponse(res, "member not create");
};

export const putMember = async (req: Request, res: Response) => {
  const url = req.url.split("/");
  const id = url[url.length - 1];
  const { body } = req;
  const update = await Member.updateOne({ _id: id }, body).catch(() => {
    return null;
  });
  update
    ? serverResponse(res, "member edit successfuly", update)
    : serverResponse(res, "member not updated");
};

export const getAllPerson = async (req: Request, res: Response) => {
  const allMembers = await Person.find().catch(() => {
    return null;
  });
  allMembers
    ? serverResponse(res, "all person obtained successfully", allMembers)
    : serverResponse(res, "all person not found");
};

export const getMeet = async (req: Request, res: Response) => {
  const url = req.url.split("/");
  const id = url[url.length - 1];
  const meet = await Meet.findById(id).catch(() => {
    return null;
  });
  meet
    ? serverResponse(res, "meet obtained successfully", meet)
    : serverResponse(res, "meet id not found");
};

export const postCreateMeet = async (req: Request, res: Response) => {
  const { members, ...rest } = req.body;
  let membersCreated: any[] = [];
  await Promise.all(
    members.map(async (member: any) => {
      const newMember = new Member({
        userId: member._id,
        role: member.role,
        isLead: false,
        status: "PENDING",
      });
      const created = await newMember.save().catch(() => {
        return null;
      });
      membersCreated.push(created);
      return;
    })
  );
  const idMembers = membersCreated.map((m: any) => m._id);
  const newMeet = new Meet({ ...rest, members: idMembers });
  await newMeet.save().catch(() => {
    return null;
  });
  sendEmails(newMeet._id, idMembers);
  newMeet
    ? serverResponse(res, "meet create successfuly", newMeet)
    : serverResponse(res, "meet not created");
};

export const putEditMeet = async (req: Request, res: Response) => {
  const { members, ...rest } = req.body;
  const url = req.url.split("/");
  const id = url[url.length - 1];
  const meet = await Meet.findById(id).catch(() => {
    return null;
  });
  let membersAlreadyCreated: any[] = [];
  let membersCreated: any[] = [];
  if (!meet) {
    serverResponse(res, "meet id not found");
  }
  if (meet) {
    await Promise.all(
      meet.members.map(async (id: any) => {
        const mem = await Member.findById(id).catch(() => {
          return null;
        });
        membersAlreadyCreated.push(mem);
        return;
      })
    );
  }

  const membersToContinue = membersAlreadyCreated.filter((e: any) => {
    const contains = members.filter(
      (m: any) => m._id === e.userId.toString() && m.role === e.role.toString()
    );
    return contains.length ? true : false;
  });

  const membersToCreate = members.filter((m: any) => {
    const contains = membersAlreadyCreated.filter(
      (e: any) => m._id === e.userId.toString()
    );
    return contains.length ? false : true;
  });
  const membersToUpdate = membersAlreadyCreated.filter((m: any) =>
    members.find(
      (e: any) => e._id === m.userId.toString() && e.role !== m.role.toString()
    )
  );
  if (membersToCreate) {
    await Promise.all(
      membersToCreate.map(async (member: any) => {
        const newMember = new Member({
          userId: member._id,
          role: member.role,
          isLead: false,
          status: "PENDING",
        });
        const created = await newMember.save().catch(() => {
          return null;
        });
        created && membersCreated.push(created._id.toString());
        return;
      })
    );
  }

  if (membersToUpdate) {
    await Promise.all(
      membersToUpdate.map(async (member: any) => {
        const { _id, userId } = member;
        const user = members.find((m: any) => m._id === userId.toString());
        if (user) {
          const update = await Member.updateOne(
            { _id: _id.toString() },
            {
              role: user.role,
            }
          ).catch(() => {
            return null;
          });
          update && membersCreated.push(_id.toString());
        }
        return;
      })
    );
  }

  if (membersToContinue) {
    membersToContinue.forEach((m: any) =>
      membersCreated.push(m._id.toString())
    );
  }
  const update = await Meet.updateOne(
    { _id: id },
    { ...rest, members: membersCreated }
  ).catch(() => {
    return null;
  });
  update
    ? serverResponse(res, "meet edit successfuly", update)
    : serverResponse(res, "meet not updated");
};

export const putConfirm = async (req: Request, res: Response) => {
  const { status } = req.body;
  const url = req.url.split("/");
  const token = url[url.length - 1];
  const member = verifyToken(token);
  const id = (member as JwtPayload).id;
  const update = await Member.updateOne({ _id: id }, { status: status }).catch(
    () => {
      return null;
    }
  );
  update
    ? serverResponse(res, "reply sent successfully", update)
    : serverResponse(res, "reply not sent");
};
