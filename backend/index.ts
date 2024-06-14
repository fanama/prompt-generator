import express from "express";
import cors from "cors";
import { aiRouter } from "./interfaces/router/chatbot";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(aiRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
