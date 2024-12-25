import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { user, expires } = req.body;

    if (!user || !expires) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    // Mock database logic
    console.log("User registration payload:", user);

    return res.status(201).json({ message: "User registered successfully" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
