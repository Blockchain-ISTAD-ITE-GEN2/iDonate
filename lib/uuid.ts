import jwt from "jsonwebtoken";

export const getUuidFromToken = (token: string): string | null => {
  try {
    const decoded: any = jwt.decode(token); // Decode the token
    return decoded?.uuid || null; // Adjust based on your token's payload structure
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
