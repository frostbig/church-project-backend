import Application from "./app";
import { config } from "dotenv";
config();
const server = Application;

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
