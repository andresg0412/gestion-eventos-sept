const request = require('supertest');
const express = require('express');
const routesUser = require('../../../../../infrastructure/adapters/http/routes/routesUser')


jest.mock('../../../../../domain/usecases/UserServiceUseCase', () => ({
    default: jest.fn().mockImplementation(() => ({
        getAllUsers: jest.fn(),
    })),
}));

jest.mock('../../../../../domain/repositories/UserRepository', () => ({
    default: jest.fn().mockImplementation(() => ({
        findAll: jest.fn().mockResolvedValue([]),
    })),
}));

describe('Routes User Test', () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        const mockUserServiceUseCase = {
            getAllUsers: jest.fn().mockResolvedValue([{
                id: '1',
                name: 'Test User'
            }])
        };
        const mockUserController = {
            getAllUsers: jest.fn().mockImplementation((req, res) => {
                res.json(mockUserServiceUseCase.getAllUsers.mock.calls[0][0]);
            })
        };
        const mockRoutesUser = {
            get: jest.fn().mockImplementation((path, handler) => {
                mockRoutesUser[path] = handler;
            })
        };

        //const mockUserControllerContructor = jest.fn().mockImplementation(() => ({
        //    getAllUsers: mockUserController.getAllUsers
        //}));

        //const mockUserServiceUseCaseConstructor = jest.fn().mockImplementation(() => ({
        //    getAllUsers: mockUserServiceUseCase.getAllUsers
        //}));

        mockRoutesUser.get('/api/users', (req, res) => {
            mockUserController.getAllUsers(req, res);
        });
        app.use('/api', mockRoutesUser);

        //mockUserServiceUseCaseConstructor.mockReturnValue(mockUserServiceUseCase);
        //mockUserControllerContructor.mockReturnValue(mockUserController);

        jest.spyOn(require('../../../../../domain/usecases/UserServiceUseCase'), 'default').mockImplementation(mockUserServiceUseCaseConstructor);
        jest.spyOn(require('../../../../../infrastructure/adapters/http/controllers/userController'), 'userController').mockImplementation(() => ({
            findAll: jest.fn().mockResolvedValue([]),
        }));
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            const response = await request(app).get('/api/users');
            expect(response.statusCode).toBe(200);
            expect(mockUserServiceUseCase.getAllUsers).toHaveBeenCalled();
        });
    });
});