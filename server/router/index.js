const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const roleController = require("../controllers/role-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const testController = require("../controllers/test-controller");
const taskController = require("../controllers/task-controller");
const variantModel = require("../models/variantModel");

router.put("/user", authMiddleware, userController.change);
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/role", roleController.createRole);
router.post("/avatar", userController.updatePicture);

router.get("/tasks", taskController.get);
router.post("/tasks", taskController.add);
router.put("/tasks/:id", taskController.change);
router.delete("/tasks/:id", taskController.delete);

router.get("/tests", testController.get);
router.post("/tests", testController.add);
router.post("/variant", async (req, res, next) => {
  try {
    const { value } = req.body;
    let variant = new variantModel({
      value: value,
      isAnswer: false,
    });
    await variant.save();
    return res.json(variant);
  } catch (e) {
    next(e);
  }
});
router.put("/tests/:id", testController.change);
router.delete("/tests/:id", testController.delete);

router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get(
  "/users",
  [authMiddleware, roleMiddleware("ADMIN")],
  userController.getUsers
);
router.get("/user/:id", authMiddleware, userController.getUser);
router.post("/tests/save", userController.saveTest);

module.exports = router;
