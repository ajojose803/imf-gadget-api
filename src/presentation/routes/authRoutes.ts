import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// POST /api/auth/login
router.post(
  "/login",
  [
    body("username").isString().withMessage("Username is required"),
    body("password").isString().withMessage("Password is required"),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate the request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { username, password } = req.body;

      // Fetch the user from the database using Prisma
      const user = await prisma.user.findUnique({
        where: { username },
      });

      // If no user found or password doesn't match, return error
      if (!user) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.json({ token });
      return;
    } catch (error) {
      console.error("Login error:", error);
      next(error);
    }
  }
);

// POST /api/auth/register
router.post(
  "/register",
  [
    body("username").isString().withMessage("Username is required"),
    body("password").isString().isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { username, password } = req.body;
      console.log(username, password)
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          passwordHash: hashedPassword,
        },
      });

      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.status(201).json({ token });
    } catch (error) {
      console.error("Registration error:", error);
      next(error);
    }
  }
);


export { router as authRoutes };
