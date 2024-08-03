import { where } from 'sequelize';
import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFormBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFormBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })

            resolve('create a new user succeed!!');
        } catch (e) {
            reject(e);
        }

    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}
let getUserInfoById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findOne({
                where: { id: userId }
            });
            if (user) {
                resolve(users);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })

}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
}