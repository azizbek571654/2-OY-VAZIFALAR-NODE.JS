import { v4 } from "uuid";

export const todoList = [];

export const doneTodoList = [];

export const todoController = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      body.id = v4();
      todoList.push(body);
      res.render("pages/index", {
        title: "Todo page",
        todoList,
        doneTodoList,
      });
    } catch (error) {
      next(error);
    }
  },
  update: (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const todoIndex = todoList.findIndex((todo) => todo.id === id);

      if (todoIndex < 0) {
        res.json({
          message: "todo not found!",
          ok: false,
        });
        return;
      }
      const update = {
        ...todoList[todoIndex],
        ...body,
      };

      console.log("=------------------------------------------=");
      console.log("update ", update);
      console.log(todoList[todoIndex], body);
      todoList.splice(todoIndex, 1, update);
      res.json({
        message: "updated",
        ok: true,
      });
      //
    } catch (error) {
      next(error);
    }
  },
  delete: (req, res, next) => {
    try {
      const id = req.params.id;
      const todoIndex = todoList.findIndex((todo) => todo.id === id);

      if (todoIndex < 0) {
        res.json({
          message: "todo not found!",
          ok: false,
        });
        return;
      }
      todoList.splice(todoIndex, 1);
      res.json({
        message: "deleted",
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
  findAll: (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  },
  findOne: (req, res, next) => {
    try {
      const id = req.params.id;
      const todo = todoList.find((todo) => todo.id === id);
      console.log("findone", todo);
      if (!todo) {
        res.render("pages/index", {
          title: "Todo page",
          todoList,
          doneTodoList,
        });
      }
      res.render("pages/edit", {
        title: "Update page",
        todo,
      });
    } catch (error) {
      next(error);
    }
  },
  done: (req, res, next) => {
    try {
      const id = req.params.id;
      const todoIndex = todoList.findIndex((todo) => todo.id === id);

      console.log({
        id,
        todoIndex,
      });
      if (todoIndex < 0) {
        res.json({
          message: "todo not found!",
          ok: false,
        });
        return;
      }
      const doneTodo = todoList[todoIndex];
      doneTodoList.push(doneTodo);

      todoList.splice(todoIndex, 1);

      console.log(doneTodo, doneTodoList);
      res.json({
        message: "done",
        ok: true,
      });
    } catch (error) {
      next(error);
    }
  },
};
