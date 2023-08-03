const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async( req, res ) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email});
    if (!findUser) {
        //create new user 
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        // User exhists
        throw new Error('User Already Exists')
    }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // checking if useer exhists 
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// get all users
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// get single user
const getaUser = asyncHandler(async (req, res) => {
    
    const {id} = req.params; 
    try {
        const getaUsers = await User.findById(id);
        res.json(getaUsers);
    } catch (error) {
        throw new Error(error);
    }
});

// update single user
const updateaUser = asyncHandler(async (req, res) => {
    const {_id} = req.user; 
    try {
        const updateaUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,

        }, {
            new: true,
        });
        res.json(updateaUser);
    } catch (error) {
        throw new Error(error);
    }
});

// delete single user
const deleteaUser = asyncHandler(async (req, res) => {
    
    const {id} = req.params; 
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json(deleteaUser);
    } catch (error) {
        throw new Error(error);
    }
});

// block user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        },
        {
            new: true,
        });
        res.json({
            message: "User Blocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});

// unblock user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        },
        {
            new: true,
        });
        res.json({
            message: "User UnBlocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createUser, loginUserCtrl, getAllUser, getaUser, deleteaUser, updateaUser, blockUser, unblockUser };