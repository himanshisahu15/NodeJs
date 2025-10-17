import logger from "../middlewares/logger/logger.js";
import { fetchAllUser, fetchUserById, createUser, editUser, removeUser, searchUser, login } from '../services/userService.js';
import jwt from 'jsonwebtoken';

export const getAllUser = async (req, res) => {
    try {
        const user = await fetchAllUser();
        logger.info(`Fetched ${user.length} user`);
        res.json(user);
    } catch (error) {
        logger.error(`Fetch error: ${error.message}`);
        res.status(500).json({
            error: "Error fetching user",
            details: error.message,
        });
    }
}

export const getUserById = async (req, res) => {
    const userid = req.params.id;
    try {
        const user = await fetchUserById(userid);
        if (!user) {
            logger.warn(`User ID ${userid} not found`);
            return res.status(404).json({ error: "User not found" });
        }
        logger.info(`User Fetched by id:${userid}`)
        res.json(user);
    } catch (error) {
        logger.error(`Fetch error:${error.message}`);
        res.status(500).json({
            error: "Error Fetching User by id",
        })
    }
}

export const addUser = async (req, res) => {
    const user = req.body;
    try {
        await createUser(user, req.user);
        logger.info(`New user added: ${JSON.stringify(user)}`);
        res.status(201).json({ message: "User Registered successfull" })
    } catch (error) {
        logger.error(`Error adding user:${error}`);
        res.status(500).json({
            error: "Error Registering User"
        })
    }
}

export const updateUser = async (req, res) => {
    const userid = req.params.id;
    const user = req.body;
    try {
        await editUser(userid, user, req.user);
        logger.info(`User updated - ID: ${userid}, Data: ${JSON.stringify(user)}`);
        res.status(200).json({ message: "user updated successfully" });
    } catch (error) {
        logger.error(`Error updating user with ID ${userid}: ${error.message}`);
        res.status(500).json({ error: "Error updating user" });
    }
}


export const deleteUser = async (req, res) => {
    const userid = req.params.id;
    try {
        await removeUser(userid);
        logger.info(`User deleted with Id:${userid}`);
        res.status(200).json({
            message: "user deleted successfully"
        })
    } catch (error) {
        logger.error(`Error deleting user with ID ${userid}:${error.message}`);
        res.status(500).json({ error: "Error deleting user" })
    }
}

export const searchUserByName = async (req, res) => {
    const { uname } = req.query;
    try {
        const users = await searchUser(uname.trim().toLowerCase());
        if (!users || users.length === 0) {
            logger.warn(`No users found with name: ${uname}`);
            return res.status(404).json({ message: "No matching users found" });
        }

        logger.info(`User find with name:${uname}`);
        res.status(200).json({
            message: "User Fetched Successfully",
            data: users
        })
    } catch (error) {
        logger.error(`Error Finding the user with name:${uname}:${error.message}`)
        res.status(500).json({ error: "Error Finding user" });
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await login(email);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            {
                userId: user.userId,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }

}