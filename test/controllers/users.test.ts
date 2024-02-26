import express from 'express';
import { getAllUsers } from '../../src/controllers/users';
import { getUsers, sortUsersByCreationDate } from '../../src/services/user.service';
import { getSortDirection } from '../../src/utils/sorting';

// Mock services and utils
jest.mock('../../src/services/user.service', () => ({
  getUsers: jest.fn(),
  sortUsersByCreationDate: jest.fn(),
}));

jest.mock('../../src/utils/sorting', () => ({
  getSortDirection: jest.fn(),
}));

// Mock express response
const mockStatus = jest.fn().mockReturnValue({ json: jest.fn().mockReturnValue({ end: jest.fn() }) });
const mockRes = { status: mockStatus } as any as express.Response;

beforeEach(() => {
  jest.clearAllMocks();
});


describe('getAllUsers controller', () => {
  it('should fetch all users and respond with 200', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    (getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (getSortDirection as jest.Mock).mockReturnValue(null); // No sorting

    const req = { query: {} } as express.Request;
    await getAllUsers(req, mockRes);

    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockStatus().json).toHaveBeenCalledWith(mockUsers);
  });

  it('should sort users by creation date if specified', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe', createdAt: '2020-01-01' }, { id: 2, name: 'Jane Doe', createdAt: '2021-01-01' }];
    const sortedUsers = [...mockUsers].reverse(); // Assuming sorting in reverse order for the example
    (getUsers as jest.Mock).mockResolvedValue(mockUsers);
    (getSortDirection as jest.Mock).mockReturnValue('desc');
    (sortUsersByCreationDate as jest.Mock).mockReturnValue(sortedUsers);

    const req = { query: { created: 'desc' } } as unknown as express.Request;
    await getAllUsers(req, mockRes);

    expect(sortUsersByCreationDate).toHaveBeenCalledWith(mockUsers, 'desc');
    expect(mockStatus().json).toHaveBeenCalledWith(sortedUsers);
  });

  
});
