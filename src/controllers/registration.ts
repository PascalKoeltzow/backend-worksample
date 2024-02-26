import { registerUser } from '../services/register.service';
import express, { Response } from 'express';


// Registration of a new user
export const register = async (req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> => {
    try {
        const { email, password, username } = req.body;

        // Validate input
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        // Register user
        const result = await registerUser(email, password, username);
        
        // Handle registration result
        if (result.success) {
            return res.status(201).json(result.user).end();
        } else {
            return res.status(400).json({ error: result.error }).end();
        }
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}
