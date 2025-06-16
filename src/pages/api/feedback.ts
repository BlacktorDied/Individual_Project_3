import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newFeedback = await prisma.feedback.create({
      data: { name, email, subject, message },
    });
    return res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
