import { Member, Person } from "../models";
import { createEmailToken } from "../utils/token";
import mailer from "../mailer";

export const sendEmails = (id: string, members: string[]) => {
  if (id && members) {
    members.forEach(async (member) => {
      const memberInfo = await Member.findById(member);

      if (!memberInfo) {
        return;
      }

      const person = await Person.findById(memberInfo.userId);
      const token = createEmailToken(member);
      if (person) {
        mailer.sendMail(
          {
            to: person.email,
            from: "church_manager@gmail.com",
            html: `<p>acesse este link para confirmar ou negar a presença: <a href='${process.env.CLIENT_LINK}/confirmation/"${id}/${token}
        '>confirmação</a></p>`,
          },
          (err) => err
        );
      }
    });
  }
};
