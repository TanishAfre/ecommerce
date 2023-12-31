const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utiles/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("./emailCtrl");

// Create a user
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


// Loging a user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // checking if useer exhists 
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?.id);
        const updateuser = await User.findOneAndUpdate(User.find._id, {
            refreshToken: refreshToken,
        }, 
        {
            new: true
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
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

// Loging a user
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    // checking if useer exhists 
    const findAdmin = await User.findOne({ email });
    if(findAdmin.role !== 'admin') throw new Error("Not Authorised");

    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?.id);
        const updateuser = await User.findOneAndUpdate(User.find._id, {
            refreshToken: refreshToken,
        }, 
        {
            new: true
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});


//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if(!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await User.findOne({ refreshToken });
    if(!user){
        throw new Error('No Refresh Token present in db or not mathed');
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err || user.id !== decoded.id){
            throw new Error("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });
});

// Logout Functionality
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await User.findOneAndUpdate(refreshToken, {
      refreshToken: "",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
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
    validateMongoDbId(id);
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
    validateMongoDbId(_id);
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
    validateMongoDbId(id);
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
    validateMongoDbId(id);
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
    validateMongoDbId(id);
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

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId( _id );
    const user = await User.findById( _id );
    if(password){
        user.password = password;
        const updatedPassword = await user.save();
        res.json( updatedPassword );
    }
    else {
        res.json(user);
    }
});


const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne( { email } );
    if(!user) throw new Error ("No user found with email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi please follow the link to reset password! THis link is only valid for 10 mins <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            html: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});


const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later ");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById( _id ).populate("wishlist");
        res.json(findUser)
    } catch (error) {
        throw new Error(error);
    }

});

// Save USer Address
const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateaUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,
            

        }, {
            new: true,
        });
        res.json(updateaUser);
    } catch (error) {
        throw new Error(error);
    }
});

const userCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    
    try {
        let products = [];
        const user = await User.findById(_id);
        // check if user already has cart 
        const alreadyExhistCart = await Cart.findOne({ orderBy: user._id });
        if (alreadyExhistCart) {
            alreadyExhistCart.remove();
        }
        for(let i=0 ; i < cart.length ; i++ ){
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();
            object.price = getPrice.price;
            products.push(object);
        }
        console.log(products);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { 
    createUser, 
    loginUserCtrl, 
    getAllUser, 
    getaUser, 
    deleteaUser, 
    updateaUser, 
    blockUser, 
    unblockUser, 
    handleRefreshToken, 
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishList,
    saveAddress,
    userCart,

};