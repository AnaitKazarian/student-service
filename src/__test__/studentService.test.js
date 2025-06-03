import {jest} from '@jest/globals';

jest.unstable_mockModule('../repository/studentRepository.js', () => ({
    findStudentById: jest.fn(),
    createStudent: jest.fn(),
    deleteStudentById: jest.fn(),
    updateStudent: jest.fn(),
    updateStudentScore: jest.fn(),
    findStudentsByName: jest.fn(),
    countStudentsByNames: jest.fn(),
    findStudentsByMinScore: jest.fn()
}));

const repo = await import ('../repository/studentRepository.js');
const service = await import('../services/studentService.js');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('studentService', () => {
    const mockStudent = { _id: '123', name: 'Alice', password: 'secret', scores: { math: 80 } };

    test('addStudent - should add a new student', async () => {
        repo.findStudentById.mockResolvedValue(null);
        repo.createStudent.mockResolvedValue();

        const result = await service.addStudent({ id: '123', name: 'Alice', password: 'secret' });
        expect(result).toBe(true);
        expect(repo.findStudentById).toHaveBeenCalledWith('123');
        expect(repo.createStudent).toHaveBeenCalledWith({ _id: '123', name: 'Alice', password: 'secret' });
    });

    test('addStudent - should not add if student exists', async () => {
        repo.findStudentById.mockResolvedValue(mockStudent);

        const result = await service.addStudent({ id: '123', name: 'Alice', password: 'secret' });
        expect(result).toBe(false);
        expect(repo.createStudent).not.toHaveBeenCalled();
    });

    test('findStudent - should return student without password', async () => {
        repo.findStudentById.mockResolvedValue({ ...mockStudent });

        const result = await service.findStudent('123');
        expect(result).toEqual({ _id: '123', name: 'Alice', scores: { math: 80 }, password: undefined });
        expect(repo.findStudentById).toHaveBeenCalledWith('123');
    });

    test('deleteStudent - should return deleted student without password', async () => {
        repo.deleteStudentById.mockResolvedValue({ ...mockStudent });

        const result = await service.deleteStudent('123');
        expect(result).toEqual({ _id: '123', name: 'Alice', scores: { math: 80 }, password: undefined });
    });

    test('updateStudent - should return updated student without scores', async () => {
        repo.updateStudent.mockResolvedValue({ ...mockStudent });

        const result = await service.updateStudent('123', { name: 'Bob' });
        expect(result).toEqual({ _id: '123', name: 'Alice', password: 'secret', scores: undefined });
    });

    test('addScore - should call updateStudentScore', async () => {
        repo.updateStudentScore.mockResolvedValue(true);

        const result = await service.addScore('123', 'math', 95);
        expect(result).toBe(true);
        expect(repo.updateStudentScore).toHaveBeenCalledWith('123', 'math', 95);
    });

    test('findByName - should return list without passwords', async () => {
        repo.findStudentsByName.mockResolvedValue([ { ...mockStudent }, { ...mockStudent, _id: '456' } ]);

        const result = await service.findByName('Alice');
        expect(result).toEqual([
            { ...mockStudent, password: undefined },
            { ...mockStudent, _id: '456', password: undefined }
        ]);
    });

    test('countByNames - should return count', async () => {
        repo.countStudentsByNames.mockResolvedValue(2);

        const result = await service.countByNames(['Alice', 'Bob']);
        expect(result).toBe(2);
        expect(repo.countStudentsByNames).toHaveBeenCalledWith(['Alice', 'Bob']);
    });

    test('findByMinScore - should return students without passwords', async () => {
        repo.findStudentsByMinScore.mockResolvedValue([
            { ...mockStudent },
            { ...mockStudent, _id: '789' }
        ]);

        const result = await service.findByMinScore('math', 80);
        expect(result).toEqual([
            { ...mockStudent, password: undefined },
            { ...mockStudent, _id: '789', password: undefined }
        ]);
    });
});
