import express from "express";
import { join } from "node:path";
import { todoRouter } from "./routes/index.js";
import { todoList, doneTodoList } from "./controllers/index.js";

const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", join(import.meta.dirname, "views"));

app.get("/", (req, res, next) => {
  res.render("pages/index", {
    title: "Home page",
    todoList,
    doneTodoList,
  });
});

app.get("/edit", (req, res, next) => {
  res.render("pages/edit", {
    title: "Update page",
    todo: {
      title: "saoasasa",
    },
  });
});
app.use("/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`Server runnin on port  http://localhost:${PORT}`);
});
