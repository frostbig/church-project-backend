import { createTransport } from "nodemailer";
import config from "./config";

const { host, port, user, pass } = config;

const transport = createTransport({ host, port, auth: { user, pass } });

export default transport;
