import * as service from '../services/studentService.js';
import {scoreSchema, studentSchema, updateStudentSchema} from "../validator/studentValidator.js";

export const addStudent = async (req, res) => {
    const {error} = studentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    const success = await service.addStudent(req.body);
    res.sendStatus(success.status);
}

export const findStudent = async (req, res) => {
    const result = await service.findStudent(+req.params.id);
    if (result.data) {
        res.json(result.data);
    } else {
        res.sendStatus(result.status);
    }
}

export const updateStudent = async (req, res) => {
    const {error} = updateStudentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    const result = await service.updateStudent(+req.params.id, req.body);
    if (result.data) {
        res.json(result.data);
    } else {
        res.sendStatus(result.status);
    }
}

export const deleteStudent = async (req, res) => {
    const result = await service.deleteStudent(+req.params.id);
    if (result.data) {
        res.json(result.data);
    } else {
        res.sendStatus(result.status);
    }
}

export const addScore = async (req, res) => {
    const {error} = scoreSchema.validate(req.body);
    if (error) {
        return res.status(400).json({error: error.details[0].message});
    }
    const result = await service.addScore(+req.params.id, req.body.examName, +req.body.score);
    res.sendStatus(result.status);
}

export const findByName = async (req, res) => {
    const result = await service.findByName(req.params.name);
    res.json(result.data);
}

export const countByNames = async (req, res) => {
    const names = Array.isArray(req.query.names) ? req.query.names : [req.query.names];
    const count = await service.countByNames(names);
    res.json(count)
}

export const findByMinScore = async (req, res) => {
    const students = await service.findByMinScore(req.params.exam, +req.params.minScore);
    res.json(students);
}