import { Application, Router } from "express";
import { IRoutes } from "../interfaces";
import {
  auth,
  verify,
  getAllMeets,
  getMeet,
  postCreateMeet,
  putEditMeet,
  getAllMembers,
  getAllRoles,
  postMember,
  putMember,
  getAllPerson,
  putConfirm,
} from "../controller";
import { authorization } from "../middlewares";

const routes: IRoutes[] = [
  {
    path: "/login",
    method: "post",
    handler: auth,
  },
  {
    path: "/token",
    method: "post",
    handler: verify,
  },
  {
    path: "/meets",
    method: "get",
    handler: getAllMeets,
    routeMiddleware: authorization,
  },
  {
    path: "/roles",
    method: "get",
    handler: getAllRoles,
    routeMiddleware: authorization,
  },
  {
    path: "/members",
    method: "get",
    handler: getAllMembers,
    routeMiddleware: authorization,
  },
  {
    path: "/members/create",
    method: "post",
    handler: postMember,
    routeMiddleware: authorization,
  },
  {
    path: "/members/edit/:id",
    method: "put",
    handler: putMember,
    routeMiddleware: authorization,
  },
  {
    path: "/person",
    method: "get",
    handler: getAllPerson,
    routeMiddleware: authorization,
  },
  {
    path: "/meet/:id",
    method: "get",
    handler: getMeet,
    routeMiddleware: authorization,
  },
  {
    path: "/meet/create",
    method: "post",
    handler: postCreateMeet,
    routeMiddleware: authorization,
  },
  {
    path: "/meet/edit/:id",
    method: "put",
    handler: putEditMeet,
    routeMiddleware: authorization,
  },
  {
    path: "/confirmation/:id",
    method: "put",
    handler: putConfirm,
  },
];

const setRouteInApplication = (app: Application) => {
  routes.forEach((config: IRoutes) => {
    const route = createRoutes(config);
    app.use(route);
  });
};

const createRoutes = (routeConfig: IRoutes): Router => {
  const router = Router();
  const { handler, method, path, routeMiddleware } = routeConfig;
  routeMiddleware
    ? router[method](path, routeMiddleware, handler)
    : router[method](path, handler);
  return router;
};

export default setRouteInApplication;
