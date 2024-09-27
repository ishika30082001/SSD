import { app } from "./app.js";
import { connectDB } from "./database/connectDb.js";
// import {connectDb} from ''


connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is working on ${process.env.PORT}`);
});
