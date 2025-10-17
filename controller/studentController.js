import { fetchAllStudent, insertStudent, changeStudent, removeStudent } from "../service/studentService.js";

export const getAllStudent = async (req, res) => {
    try {
        const student = await fetchAllStudent();
        if (!student || student.length===0) {
            res.status(404).json({ message: "student not found" })
        }
        res.status(200).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error fetching student' })
    }
}
export const createStudent = async (req, res) => {
    try {
        const student = req.body;
        await insertStudent(student);
        res.status(201).json({ message: "student inserted succesfull" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error inserting student' })
    }
}

export const updateStudent = async (req, res) => {
    try {
        const studentid = req.params.id;
        const student = req.body;
        await changeStudent(studentid, student);
        res.status(201).json({ message: "student updated succesfull" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error updating student' })
    }
}
export const deleteStudent = async (req, res) => {
    try {
        const studentid = req.params.id;
        await removeStudent(studentid);
        res.status(201).json({ message: "student deleted succesfull" })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error deleting student' })
    }
}