import { mockUsers } from "@/data/data";
import { User } from "@/difinitions/types/media/user";

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email and password
    const user = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (!user) {
      return null;
    }

    if (!user.isActive) {
      return null;
    }

    // Update last login
    user.lastLogin = new Date();

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  getCurrentUser: async (): Promise<User | null> => {
    // In a real app, this would validate the session token
    const { password: _, ...userWithoutPassword } = mockUsers[0];
    return userWithoutPassword;
  },
};
