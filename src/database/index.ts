import { connect } from "mongoose";
import { config } from "dotenv";
config();

const dbConnection = () => {
  const path = process.env.DB_CONNECTION || "";
  connect(path).then(
    () => console.log("DB CONNECTED"),
    (err) => console.log(`DB ERROR : ${err}`)
  );
};

export default dbConnection;
