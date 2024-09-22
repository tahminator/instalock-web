import { db } from "@/lib/server/db/init";
import { randomUUID } from "crypto";
import express from "express";
import jwt from "jsonwebtoken";

export const jwtRouter = express.Router();

jwtRouter.post("", async (_, res) => {
  try {
    if (!res.locals.user || !res.locals.session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = res.locals.user;

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: 60 * 60 * 24 * 365, // 1 year
      }
    );

    await db.apiKey.create({
      data: {
        id: randomUUID(),
        key: token,
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000), // 1 year
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return res.json({
      succes: true,
      token,
      message: "Token created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
});

jwtRouter.get("/check", async (req, res) => {
  try {
    if (!res.locals.user || !res.locals.session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.query.token as string;

    const user = res.locals.user;

    const apiKey = await db.apiKey.findFirst({
      where: {
        userId: user.id,
        key: token,
      },
    });

    if (!apiKey) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (apiKey.expiresAt < new Date()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (apiKey.used) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await db.apiKey.update({
      where: {
        id: apiKey.id,
      },
      data: {
        used: true,
      },
    });

    return res.json({
      success: true,
      message: "Token is valid",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
});
