import Student from "../model/Student.js"

export const fetchAllStudent=async()=>{
    const student=await Student.find({is_deleted:false});
    return student;
}

export const insertStudent=async(student)=>{
    return await Student.create(student);
}
export const changeStudent=async(studentid,student)=>{
    return await Student.findByIdAndUpdate(studentid,student,{new:true})
}

export const removeStudent=async(studentid)=>{
return await Student.findByIdAndUpdate(studentid,{is_deleted:true},{new:true})
}