import {Student} from "../model/student.js";

const students = new Map();

export const addStudent = ({id, name, password}) => {
    if (students.has(id)) {
        return false;
    }
    students.set(id, new Student(id, name, password));
    return true;
}

export const findStudent = id => students.get(id);

export const deleteStudent = id => {
    const student = students.get(id);
    if (student) {
        students.delete(id);
        return student;
    }
}

export const updateStudent = (id, data) => {
    const student = students.get(id);
    if (student) {
        Object.assign(student, data);
        return student;
    }
}

export const addScore = (id, examName, score) => {
    const student = students.get(id);
    student.scores[examName] = score;
    return true;
}

export const findByName = (name) => {
    for (const student of students.values()) {
        if (student.name === name) {
            return student;
        }
    }
}

export const countByNames = (names) => {
    let count = 0;
    for (const student of students.values()) {
        if (names.includes(student.name)) {
            count++;
        }
    }
    return count;
}

export const findByMinScore = (exam, minScore) => {
    const result = [];
    for (const student of students.values()) {
        if (student.scores && student.scores[exam] >= minScore) {
            result.push(student);
        }
    }
    return result;
}
