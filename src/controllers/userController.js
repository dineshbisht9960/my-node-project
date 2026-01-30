const User = require("../models/User");
const { createToken } = require("../utills/createToken")
const bcrypt = require("bcrypt");
const { createOtp } = require('../utills/createOtp');
const { sendSMSService } = require("../utills/twilio")
const userOtp = require('../models/userOtp')

module.exports.signUp = async (data) => {
    try {
        const { name, email, password, confirmPassword, gender, phone } = data

        const findUser = await User.findOne({ email})
        if (findUser) {
            throw new Error("this email is already exist")
        }

        const findNumber = await User.findOne({phone})
        if(findNumber) {
            throw new Error("this number is already exist")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            phone
        });
        // OTP GENERATE
        const otp = createOtp();
        console.log(otp);
        await userOtp.otps.create({
            phone,
            otp
        })
        const fullnumber = "+91" + phone;
        await sendSMSService(fullnumber, otp);

        return { message: "Signup Successful" };

    } catch (error) {
        throw error;
    }
};

module.exports.login = async (data) => {
    try {
        const { email, password } = data;
        // if (!email || !password) {
        //     throw new Error('Email and password are required')
        // }

        const userData = await User.findOne({ email });
        console.log(userData);

        if (!userData) {
            throw new Error("email or password is incorrect");
        }

        const isValid = await bcrypt.compare(password, userData.password);
        if (!isValid) {
            throw new Error("email or password is incorrect");
        }

        const tokenData = {
            id: userData.id
        }
        console.log(tokenData);

        const token = await createToken(tokenData)
        console.log(token);

        return {
            message: "Login Successful",
            token
        };
    } catch (error) {
        throw error;
    }
};

module.exports.updateData = async (id, data) => {
    try {
        const { name, email, password, confirmPassword, gender } = data;
        const findUser = await User.findById(id)
        if (!findUser) {
            throw new Error("user not found")
        };

        let hashPassword = findUser.password;

        if (password) {
            hashPassword = await bcrypt.hash(password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(id,
            { $set: { name, email, password: hashPassword, gender } },
            { new: true }
        );
        return {
            message: "update successfully",
            updateUser
        };

    } catch (error) {
        console.log(error);
        throw error;
    }
}