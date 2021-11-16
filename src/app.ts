import express, { Application } from "express";
import Routes from "./routes/index";
import dbConnection from "./database/";
import cors from "cors";

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.setupApplication();
  }

  private setupApplication() {
    dbConnection();
    this.app.use(cors());
    this.app.use(express.json());
    Routes(this.app);
  }

  public getServer(): Application {
    return this.app;
  }
}

export default new App().getServer();
