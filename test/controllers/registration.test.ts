import express from 'express';
import { register } from '../../src/controllers/registration';
import * as registerService from '../../src/services/register.service';

jest.mock('../../src/services/register.service');

describe('register controller', () => {
    let req: express.Request;
    let res: express.Response;
    let next: express.NextFunction;

    beforeEach(() => {
        req = { body: {} } as express.Request;
        res = {
            sendStatus: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as express.Response;
        next = jest.fn();
        
        // Mock console.error
        console.error = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if request body is missing required fields', async () => {
        await register(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(400);
        expect(registerService.registerUser).not.toHaveBeenCalled();
    });

    it('should return 500 if an error occurs during registration', async () => {
        const errorMessage = 'Internal server error';
        (registerService.registerUser as jest.Mock).mockRejectedValue(new Error(errorMessage));
        req.body = { email: 'test@example.com', password: 'password', username: 'testuser' };

        await register(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(500);
        expect(registerService.registerUser).toHaveBeenCalledWith('test@example.com', 'password', 'testuser');
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });

    it('should return 201 with user data if registration is successful', async () => {
        const userData = { id: 1, email: 'test@example.com', username: 'testuser' };
        (registerService.registerUser as jest.Mock).mockResolvedValue({ success: true, user: userData });
        req.body = { email: 'test@example.com', password: 'password', username: 'testuser' };

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(userData);
        expect(registerService.registerUser).toHaveBeenCalledWith('test@example.com', 'password', 'testuser');
    });

    it('should return 400 with error message if registration fails', async () => {
        const errorMessage = 'User already exists';
        (registerService.registerUser as jest.Mock).mockResolvedValue({ success: false, error: errorMessage });
        req.body = { email: 'test@example.com', password: 'password', username: 'testuser' };

        await register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        expect(registerService.registerUser).toHaveBeenCalledWith('test@example.com', 'password', 'testuser');
    });
});
