import { Op } from "sequelize";
import { sequelize } from "../config/db.js"
import User from "../model/User.js"

export const importUserService = async (users) => {
    // return sequelize.transaction(async (t) => {
    //     for (const user of users) {
    //         await User.upsert(user, { transaction: t });
    //     }
    // })

    //if no of user should me 1000

      return sequelize.transaction(async (t) => {
        // Bulk insert with update if id exists
        await User.bulkCreate(users, {
            updateOnDuplicate: ["firstName", "lastName", "age", "city"],
            transaction: t
        });
    });
}

export const listUserService = async ({ page, pageSize, q, sortBy, orderBy }) => {
    const offset = (page - 1) * pageSize;
    //values used for sorting if user type something else use default value  
    const allowedSort = ["id", "firstName", "lastName", "age", "city", "createdAt"];

    if (!allowedSort.includes(sortBy)) {
        sortBy = "firstName";
    }
    orderBy = (orderBy || "asc").toLowerCase() === "desc" ? "DESC" : "ASC";

    const { count, rows } = await User.findAndCountAll({
        where: q ? {
            [Op.or]: [
                { firstName: { [Op.like]: `%${q}%` } },
                { lastName: { [Op.like]: `%${q}%` } },
                { city: { [Op.like]: `%${q}%` } },
            ]
        } : {},
        limit: pageSize,
        offset,
        order: [[sortBy, orderBy]]
    });
    return { rows, count };
}