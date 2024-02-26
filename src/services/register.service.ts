import { createUser, getUserByEmail, getUserByName } from './user.service';
import { generateRandomString, hashPassword } from '../utils/crypto';

export interface RegistrationResult {
    success: boolean;
    user?: any;
    error?: string;
}

export const registerUser = async (email: string, password: string, username: string): Promise<RegistrationResult> => {
    try {
        // Check if user with the same email already exists
        const existingUserByEmail = await getUserByEmail(email);
        if (existingUserByEmail) {
            return { success: false, error: 'User already exists' };
        }

        // Check if user with the same username already exists
        const existingUserByName = await getUserByName(username);
        if (existingUserByName) {
            return { success: false, error: 'Username already exists' };
        }

        // Generate salt and hash the password
        const salt = generateRandomString();
        const hashedPassword = hashPassword(password, salt);

        // Create new user
        const newUser = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: hashedPassword
            }
        });

        return { success: true, user: newUser };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, error: 'Internal server error' };
    }
}

