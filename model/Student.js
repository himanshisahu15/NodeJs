import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    student_id: {
        type: Number,
       unique:true
    },
    student_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
    // createdAt:{
    //     type:DataTypes.DATE,
    // },
    //  updatedAt:{
    //     type:DataTypes.DATE,
    // }
}, {
    collation: "Student",
    timestamps: true
}

);

export const Student = mongoose.model("Student", studentSchema);

export default Student