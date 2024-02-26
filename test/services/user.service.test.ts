import {
    getUsers,
    getUserByEmail,
    getUserByName,
    createUser,
    sortUsersByCreationDate,
  } from '../../src/services/user.service';
  import { UserModel } from '../../src/models/users';
  
  // Mock UserModel methods
  jest.mock('../../src/models/users', () => ({
    UserModel: {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
    },
  }));
  
  describe('User Service', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getUsers', () => {
      it('should call UserModel.find', async () => {
        await getUsers();
        expect(UserModel.find).toHaveBeenCalled();
      });
    });
  
    describe('getUserByEmail', () => {
      it('should call UserModel.findOne with the provided email', async () => {
        const email = 'test@example.com';
        await getUserByEmail(email);
        expect(UserModel.findOne).toHaveBeenCalledWith({ email });
      });
    });
  
    describe('getUserByName', () => {
      it('should call UserModel.findOne with the provided username', async () => {
        const username = 'testuser';
        await getUserByName(username);
        expect(UserModel.findOne).toHaveBeenCalledWith({ username });
      });
    });
  
    describe('createUser', () => {
      it('should call UserModel.create with the provided values', async () => {
        const userData = { username: 'testuser', email: 'test@example.com' };
        await createUser(userData);
        expect(UserModel.create).toHaveBeenCalledWith(userData);
      });
    });
  
    describe('sortUsersByCreationDate', () => {
      it('should sort users by creation date in ascending order', () => {
        const users = [
          { username: 'user1', date: new Date('2023-01-01') },
          { username: 'user2', date: new Date('2023-01-03') },
          { username: 'user3', date: new Date('2023-01-02') },
        ];
        const sortedUsers = sortUsersByCreationDate(users, 'asc');
        expect(sortedUsers).toEqual([
          { username: 'user1', date: new Date('2023-01-01') },
          { username: 'user3', date: new Date('2023-01-02') },
          { username: 'user2', date: new Date('2023-01-03') },
        ]);
      });
  
      it('should sort users by creation date in descending order', () => {
        const users = [
          { username: 'user1', date: new Date('2023-01-01') },
          { username: 'user2', date: new Date('2023-01-03') },
          { username: 'user3', date: new Date('2023-01-02') },
        ];
        const sortedUsers = sortUsersByCreationDate(users, 'desc');
        expect(sortedUsers).toEqual([
          { username: 'user2', date: new Date('2023-01-03') },
          { username: 'user3', date: new Date('2023-01-02') },
          { username: 'user1', date: new Date('2023-01-01') },
        ]);
      });
    });
  });
  