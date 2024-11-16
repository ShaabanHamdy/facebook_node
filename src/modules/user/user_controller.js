import bcrypt from "bcryptjs";
import { customAlphabet } from "nanoid";
import sendEmail from "../../utils/send_email.js";
import { tokenGeneration } from "../../utils/tokenGeneration.js";
import userModal from "../../../db/models/users_modal.js";
//  =======================================================    signup

export const signup = async (req, res, next) => {
  const checkUser = await userModal.findOne({ email: req.body.email });
  if (checkUser) {
    return next(new Error("Email Already Exist"));
  }
  const user = new userModal(req.body);
  await user.save();
  if (!user) return next(new Error("fail to create user"));
  const token = tokenGeneration({ payload: { user } });
  if (!token) return next(new Error("fail to generate token", { cause: 400 }));
  res.json({ message: "success", user });
};
//  =======================================================  login

export const login = async (req, res, next) => {
  // const checkUser = await userModal.findOne({ email: req.body.email })
  const checkUser = await userModal.findOne({
    $or: [{ email: req.body.identifier }, { mobile: req.body.identifier }],
  });

  if (!checkUser && req.body.identifier.includes("@")) {
    return next(new Error("invalid email  information", { cause: 409 }));
  }
  if (!checkUser) {
    return next(
      new Error("invalid  mobile number information", { cause: 409 })
    );
  }
  const matchPassword = bcrypt.compareSync(
    req.body.password,
    checkUser.password
  );
  if (!matchPassword)
    return next(new Error("invalid password information", { cause: 409 }));
  const token = tokenGeneration({
    payload: { id: checkUser._id, role: checkUser.role },
    expiresIn: 60 * 30,
  });
  await userModal.updateOne({ status: "online" });
  res.json({ message: "success", token });
};
//  ======================================================= logout
export const logout = async (req, res, next) => {
  const user = await userModal.updateOne({ status: "offline" });
  res.status(201).json({ message: "success ", user });
};
//  ======================================================= sendCode
export const sendCode = async (req, res, next) => {
  const user = await userModal.findOne({ email: req.body.email });
  if (!user) {
    return next(Error("invalid email information"));
  }

  const id = customAlphabet("123456789");
  const code = id(4);
  const message = ` Hello ${user.name} your code is ${code}`;
  const emailIsSend = sendEmail({
    to: req.body.email,
    message,
    subject: "Confirmation Email",
  });
  if (!emailIsSend) {
    return next(Error("send Email fail"));
  }
  await userModal.updateOne({ forgetCode: code });
  res
    .status(201)
    .json({ message: "please check your Gmail to get your Confirmation Code" });
};
//  ======================================================= confirmCodeInfo

let codeContainer;
export const confirmCodeInfo = async (req, res, next) => {
  if (!(await userModal.findOne({ forgetCode: req.body.code }))) {
    return next(Error("Invalid code"));
  }
  codeContainer = req.body.code;
  res.status(201).json({ message: "success go to change password page" });
};
// ====================================================================== changePassword
export const changePassword = async (req, res, next) => {
  const checkCodeInfo = await userModal.findOne({ forgetCode: codeContainer });
  if (!checkCodeInfo) {
    return next(Error("not equal code"));
  }
  const hashNewPassword = bcrypt.hashSync(
    req.body.newPassword,
    +process.env.SALT_ROUNDS
  );
  await userModal.updateOne({
    password: hashNewPassword,
    forgetCode: 0,
    changePasswordTime: Date.now(),
  });
  return res
    .status(200)
    .json({ message: "change password successfully", hashNewPassword });
};

// ====================================================================== changePassword
export const settingsProfile = async (req, res, next) => {
  const settingsProfile = await userModal.findOneAndUpdate(
    { _id: req.user.id },
    {
      name: req.body.name,
      birthOfDate: req.body.birthOfDate,
      profileImage: req.files?.profileImage?.map(
        (e) => "https://shaaban-facebook-node.up.railway.app/" + e.path
      ),
    },
    { new: true }
  );
  if (!settingsProfile) {
    return next(Error("failed"));
  }
  return res.status(200).json({ message: "Done", settingsProfile });
};

// ====================================================================== getUserInfo
export const getUserInfo = async (req, res, next) => {
  const user = await userModal.findOne({ _id: req.user.id });
  return res.status(200).json({ message: "Done", user });
};
// ====================================================================== getAllUsers
export const getAllUsers = async (req, res, next) => {
  // const users = await userModal.find().populate("myFriends")
  // return res.status(200).json({ message: "Done", users })

  const currentUserId = req.user.id;
  const currentUser = await userModal
    .findById(currentUserId)
    .select("myFriends")
    .populate("myFriends");

  const allUsers = await userModal.find({
    _id: { $nin: [currentUserId, ...currentUser.myFriends] },
  });
  res
    .status(200)
    .json({ message: "success", users: allUsers, friends: currentUser });
};
// ============================================================== addFriend
export const addFriend = async (req, res, next) => {
  const user = await userModal.findOneAndUpdate(
    { _id: req.user.id },
    {
      $addToSet: { myFriends: req.body.newFriendId },
    },
    { new: true }
  );
  if (!user) return next(new Error("invalid id"));
  return res.status(200).json({ message: "success", user });
};
// ===========================================================
export const removeFriend = async (req, res, next) => {
  const user = await userModal.findOneAndUpdate(
    { _id: req.user.id },
    {
      $pull: { myFriends: req.body.newFriendId },
    },
    { new: true }
  );
  if (!user) return next(new Error("invalid id"));
  return res.status(200).json({ message: "success", user });
};
