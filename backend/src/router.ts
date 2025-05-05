import { Router } from "express";
import { body } from "express-validator";
import { createAccount, login } from "./handlers";
import { handleInputErrors } from "./middleware/validation";

const router = Router();

//Autenticacion y registro
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El handle no puede ir vacío"),
  body("name").notEmpty().withMessage("El name no puede ir vacío"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("El password debe tener mas de 8 caracteres"),
  body("email").isEmail().withMessage("El e-mail no es valido"),
  handleInputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("password").notEmpty().withMessage("El password es obligatorio"),
  body("email").isEmail().withMessage("El e-mail no es valido"),
  handleInputErrors,
  login
);

export default router;
