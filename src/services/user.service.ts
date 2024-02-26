import { UserModel } from '../models/users';

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByName = (username: string) => UserModel.findOne({ username });
export const createUser = (values: Record<string, any>) => UserModel.create(values);


export const sortUsersByCreationDate = (users: any[], sortByCreated: string): any[] => {
    return users.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortByCreated === 'asc' ? dateA - dateB : dateB - dateA;
    });
};