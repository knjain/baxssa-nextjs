import bcrypt from "bcryptjs";

// Define the type of the password parameter as string
const securePassword = async (password: string): Promise<string> => {
  try {
    // Hash the password with a salt round of 10
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // Ensure the error is propagated
  }
};

// Use ES6 module export
export default securePassword;
