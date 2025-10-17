import { Op,fn, col, where } from "sequelize";
import User from "../models/userModel.js"

export const fetchAllUser=async(req,res)=>{
    return await User.findAll({where :{is_deleted:false}});
}

export const fetchUserById=async(id)=>{
    return await User.findOne({
        where:{userId:id,is_deleted:false}
    })
}

export const createUser=async(user,currentUser)=>{
    return await User.create(user,{
        individualHooks:true,
        currentUser
    });
}

export const editUser=async(id,user,currentUser)=>{
    return await User.update(user,{where:{userId:id},
    individualHooks:true,currentUser
});
}

export const removeUser=async(id)=>{
    return await User.update({is_deleted:true},{where:{userId:id}});
}

export const searchUser = async (name) => {
  return await User.findAll({
    where: {
      is_deleted: false,
      [Op.and]: [
        where(fn("LOWER", col("name")), Op.like, `%${name.toLowerCase()}%`)
      ]
    }
  });
};

export const login=async(email)=>{
    return await User.findOne({where:{email,is_deleted:false}});
}