import { Card, User } from "e-comm-gt-api";
import express, { Request, Response, Router } from "express";
import {
  addCard,
  getAllUsae,
  getUser,
  login,
  registerEmployee,
  signUp,
  updateEmployee,
} from "../controllers/user.controller";

export const userRoute: Router = express.Router();

userRoute.get("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await getUser(username);

  return res.json(user);
});

userRoute.get("", async (req: Request, res: Response) => {
  const users = await getAllUsae();

  return res.json(users);
});

userRoute.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).send("To login you must send username and password");
  }

  try {
    const loggedUser = await login(username, password);
    res.json(loggedUser);
  } catch (e: any) {
    console.error(e);
    res.status(400).send(e.message);
  }
});

userRoute.post("/seller", async (req: Request, res: Response) => {
  const user: User = req.body || {};

  if (!user || !user.username || !user.password) {
    return res
      .status(400)
      .send("To create an user you must send username and password");
  }

  try {
    const createdUser = await signUp(user);
    res.json(createdUser);
  } catch (e: any) {
    console.error(e);
    res.status(400).send("Some data was invalid, please check the data sended");
  }
});

userRoute.post("/employee", async (req: Request, res: Response) => {
  const { user, admin } = req.body || {};

  if (!user || !admin) {
    return res
      .status(400)
      .send(
        "To register an employee you must send the user to register and actual user as admin"
      );
  }

  try {
    const registeredEmployee = await registerEmployee(user, admin);
    res.json(registeredEmployee);
  } catch (e: any) {
    res.status(403).send(e.message);
  }
});

userRoute.post("/:username/card", async (req: Request, res: Response) => {
  const { username } = req.params;
  const card: Card | undefined = req.body || {};

  if (!card || !card.CVV) {
    return res.status(400).send("To add a card you need to send a valid card");
  }

  const registeredEmployee = await addCard(username, card);

  if (!registeredEmployee) {
    return res.status(403).send("The seller was not found");
  }
  res.json(registeredEmployee);
});

userRoute.put("/employee", async (req: Request, res: Response) => {
  const { user, admin } = req.body || {};

  if (!user || !admin) {
    return res
      .status(400)
      .send(
        "To update an employee you must send the user to update and actual user as admin"
      );
  }

  try {
    const updatedEmployee = await updateEmployee(user, admin);
    res.json(updatedEmployee);
  } catch (e: any) {
    res.status(403).send(e.message);
  }
});
