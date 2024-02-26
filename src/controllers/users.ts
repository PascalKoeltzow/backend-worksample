import express from 'express';
import { getUsers, sortUsersByCreationDate } from '../services/user.service';
import { getSortDirection } from '../utils/sorting';

// Get all users and sort them by creation date
export const getAllUsers = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    try {
        let users = await getUsers();
        const sortByCreated = getSortDirection(req.query.created as string);

        if (sortByCreated) {
            users = sortUsersByCreationDate(users, sortByCreated);
        }

        return res.status(200).json(users).end();
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

