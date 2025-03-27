import { Router } from "express";
import { todoController } from "../controllers/index.js";
const router = Router();

// localhost: 4000/todo; method
router.get("/", todoController.findAll);
router.get("/:id", todoController.findOne);
router.post("/", todoController.create);
router.put("/:id", todoController.update);
router.delete("/:id", todoController.delete);
router.get("/done/:id", todoController.done);

export { router as todoRouter };
