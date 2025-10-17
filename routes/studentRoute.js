import express from "express";
import {getAllStudent,createStudent,updateStudent,deleteStudent} from '../controller/studentController.js'
import { validate } from "../middleware/validate.js";
import schema from "../middleware/schema.js";
const router=express.Router();

router.get('/',getAllStudent);
router.post('/',validate(schema),createStudent);
router.put('/:id',validate(schema),updateStudent);
router.delete('/:id',deleteStudent);

export default router;