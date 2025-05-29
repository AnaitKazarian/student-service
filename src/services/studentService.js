import * as repo from '../repository/studentRepository.js'

export const addStudent = async ({id, name, password}) => {
    const existing = await repo.findStudentById(id);
    if (existing) {
        return {status: 409};
    }
    await repo.createStudent({_id: id, name, password});
    return {status: 201};
}

export const findStudent = async (id) => {
    const student = await repo.findStudentById(id);
    if (student) {
        student.password = undefined;
        return {data: student};
    }
    return {status: 404};
}

export const updateStudent = async (id, data) => {
    const student = await repo.updateStudent(id, data);
    if (student) {
        student.scores = undefined;
        return {data: student};
    }
    return {status: 404};
}

export const deleteStudent = async (id) => {
    const student = await repo.deleteStudentById(id);
    if (student) {
        student.password = undefined;
        return {data: student};
    }
    return {status: 404};
}

export const addScore = async (id, exam, score) => {
    const success = await repo.updateStudentScore(id, exam, score);
    return {status: success ? 204 : 409};
}

export const findByName = async (name) => {
    const students = (await repo.findStudentsByName(name))
        .map(student => {
            student.password = undefined;
            return student;
        });
    return {data: students};
}

export const countByNames = async (names) => {
    return await repo.countStudentsByNames(names);
}

export const findByMinScore = async (exam, minScore) => {
    return await repo.findStudentsByMinScore(exam, minScore);
}

