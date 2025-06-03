import { jest } from '@jest/globals';

const mockService = {
    addStudent: jest.fn(),
    findStudent: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
    addScore: jest.fn(),
    findByName: jest.fn(),
    countByNames: jest.fn(),
    findByMinScore: jest.fn()
};

jest.unstable_mockModule('../services/studentService.js', () => mockService);

const controller = await import('../controller/studentController.js');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    return res;
};

describe('studentController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('addStudent - success', async () => {
        const req = { body: { id: 1, name: 'Alice', password: 'secret' } };
        const res = mockResponse();
        mockService.addStudent.mockResolvedValue(true);

        await controller.addStudent(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(201);
    });

    it('addStudent - conflict', async () => {
        const req = { body: { id: 1, name: 'Alice', password: 'secret' } };
        const res = mockResponse();
        mockService.addStudent.mockResolvedValue(false);

        await controller.addStudent(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(409);
    });

    it('findStudent - found', async () => {
        const req = { params: { id: '1' } };
        const res = mockResponse();
        mockService.findStudent.mockResolvedValue({ id: 1, name: 'Alice' });

        await controller.findStudent(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Alice' });
    });

    it('findStudent - not found', async () => {
        const req = { params: { id: '1' } };
        const res = mockResponse();
        mockService.findStudent.mockResolvedValue(null);

        await controller.findStudent(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('updateStudent - success', async () => {
        const req = { params: { id: '1' }, body: { name: 'Bob' } };
        const res = mockResponse();
        mockService.updateStudent.mockResolvedValue({ id: 1, name: 'Bob' });

        await controller.updateStudent(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Bob' });
    });

    it('deleteStudent - success', async () => {
        const req = { params: { id: '1' } };
        const res = mockResponse();
        mockService.deleteStudent.mockResolvedValue({ id: 1, name: 'Alice' });

        await controller.deleteStudent(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Alice' });
    });

    it('deleteStudent - not found', async () => {
        const req = { params: { id: '1' } };
        const res = mockResponse();
        mockService.deleteStudent.mockResolvedValue(null);

        await controller.deleteStudent(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('addScore - success', async () => {
        const req = { params: { id: '1' }, body: { examName: 'Math', score: 95 } };
        const res = mockResponse();
        mockService.addScore.mockResolvedValue(true);

        await controller.addScore(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('addScore - conflict', async () => {
        const req = { params: { id: '1' }, body: { examName: 'Math', score: 95 } };
        const res = mockResponse();
        mockService.addScore.mockResolvedValue(false);

        await controller.addScore(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(409);
    });

    it('findByName - should return students', async () => {
        const req = { params: { name: 'Alice' } };
        const res = mockResponse();
        mockService.findByName.mockResolvedValue([{ id: 1, name: 'Alice' }]);

        await controller.findByName(req, res);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Alice' }]);
    });

    it('countByNames - single param', async () => {
        const req = { query: { names: 'Alice' } };
        const res = mockResponse();
        mockService.countByNames.mockResolvedValue(1);

        await controller.countByNames(req, res);
        expect(res.json).toHaveBeenCalledWith(1);
    });

    it('countByNames - multiple params', async () => {
        const req = { query: { names: ['Alice', 'Bob'] } };
        const res = mockResponse();
        mockService.countByNames.mockResolvedValue(2);

        await controller.countByNames(req, res);
        expect(res.json).toHaveBeenCalledWith(2);
    });

    it('findByMinScore - should return students', async () => {
        const req = { params: { exam: 'Math', minScore: '80' } };
        const res = mockResponse();
        mockService.findByMinScore.mockResolvedValue([{ id: 1, name: 'Alice' }]);

        await controller.findByMinScore(req, res);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'Alice' }]);
    });
});
