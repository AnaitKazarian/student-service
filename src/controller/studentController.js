import * as repo from '../repository/studentRepository.js';

export const addStudent = (req, res) => {
    const success = repo.addStudent(req.body);
    if (success) {
        res.status(204).send();
    } else {
        res.status(409).send();
    }
}

export const findStudent = (req, res) => {
    const student = repo.findStudent(+req.params.id);
    if (student) {
        const tmp = {...student};
        delete tmp.password;
        res.json(tmp);
    } else {
        res.status(404).send();
    }
}

export const updateStudent = (req, res) => {
    const student = repo.updateStudent(+req.params.id, req.body);
    if (student) {
        const tmp = {...student};
        delete tmp.scores;
        res.json(tmp);
    } else {
        res.status(404).send();
    }
}

export const deleteStudent = (req, res) => {
    const student = repo.deleteStudent(+req.params.id);
    if (student) {
        delete student.password;
        res.json(student);
    } else {
        res.status(404).send();
    }
}

export const addScore = (req, res) => {
    const {examName, score} = req.body;
    const success = repo.addScore(+req.params.id, examName, score);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
}

export const findByName = (req, res) => {
    const name = req.params.name;
    const student = repo.findByName(name);
    if (student) {
        const tmp = { ...student };
        delete tmp.password;
        res.json(tmp);
    } else {
        res.status(404).send();
    }
}

export const countByNames = (req, res) => {
    let names = req.query.names;
    if (!names) {
        return res.status(400).send();
    }
    if (!Array.isArray(names)) {
        names = [names];
    }
    const quantity = repo.countByNames(names);
    res.send(quantity.toString());
}

export const findByMinScore = (req, res) => {
    const exam = req.params.exam;
    const minScore = Number(req.params.minScore);
    if (!exam || !minScore) {
        return res.status(400).send();
    }
    const students = repo.findByMinScore(exam, minScore);
    const result = [];
    for (const student of students) {
        const tmp = { ...student };
        delete tmp.password;
        result.push(tmp);
    }
    res.json(result);
}

