import * as registerService from '../../src/services/register.service';
import { createUser, getUserByEmail, getUserByName } from '../../src/services/user.service';
import { generateRandomString, hashPassword } from '../../src/utils/crypto';

jest.mock('../../src/services/user.service');
jest.mock('../../src/utils/crypto');

describe('register service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return success true and user data if registration is successful', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const username = 'testuser';
        const salt = 'randomSalt';
        const hashedPassword = 'hashedPassword';
        const newUser = { id: 1, email, username };

        (getUserByEmail as jest.Mock).mockResolvedValue(null);
        (getUserByName as jest.Mock).mockResolvedValue(null);
        (generateRandomString as jest.Mock).mockReturnValue(salt);
        (hashPassword as jest.Mock).mockReturnValue(hashedPassword);
        (createUser as jest.Mock).mockResolvedValue(newUser);

        const result = await registerService.registerUser(email, password, username);

        expect(getUserByEmail).toHaveBeenCalledWith(email);
        expect(getUserByName).toHaveBeenCalledWith(username);
        expect(generateRandomString).toHaveBeenCalled();
        expect(hashPassword).toHaveBeenCalledWith(password, salt);
        expect(createUser).toHaveBeenCalledWith({ email, username, authentication: { salt, password: hashedPassword } });
        expect(result).toEqual({ success: true, user: newUser });
    });

    it('should return success false and error message if user already exists', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const username = 'testuser';

        (getUserByEmail as jest.Mock).mockResolvedValue({ id: 1, email, username });

        const result = await registerService.registerUser(email, password, username);

        expect(getUserByEmail).toHaveBeenCalledWith(email);
        expect(getUserByName).not.toHaveBeenCalled();
        expect(createUser).not.toHaveBeenCalled();
        expect(result).toEqual({ success: false, error: 'User already exists' });
    });

    it('should return success false and internal server error message if an error occurs', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const username = 'testuser';
        const errorMessage = 'Internal server error';

        (getUserByEmail as jest.Mock).mockRejectedValue(new Error(errorMessage));

        const result = await registerService.registerUser(email, password, username);

        expect(getUserByEmail).toHaveBeenCalledWith(email);
        expect(getUserByName).not.toHaveBeenCalled();
        expect(createUser).not.toHaveBeenCalled();
        expect(result).toEqual({ success: false, error: 'Internal server error' });
    });
});
