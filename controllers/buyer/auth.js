import Buyer from "../../databases/buyer/BuyerModel.js";
import createToken from "../../utils/jwt.js";
import pass_hash from "../../utils/pass_hash.js";
import nodemailer from "nodemailer";

const checkUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Buyer.findOne({ email: email });
    if (user) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createAccount = async (req, res) => {
  const {
    email,
    password,
    full_name,
    location,
    phone_number,
    account_type,
    know_us,
    referral_code,
    benefit_code,
  } = req.body;

  try {
    const hashPass = await pass_hash.encrypt(password);
    const new_buyer = await Buyer.create({
      email,
      password: hashPass,
      full_name,
      location,
      phone_number,
      account_type,
      know_us,
      referral_code,
      benefit_code,
    });
    if (new_buyer) {
      return res.status(200).json({ new_buyer: new_buyer });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const buyerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await Buyer.findOne({ email: email });
    if (!buyer) {
      return res.status(404).json({ error: `${email} does not exists!` });
    }
    const isValidPassword = await pass_hash.compare(password, buyer.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = createToken(buyer.email);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: buyer,
      access_token: token,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nickey968@gmail.com",
    pass: "klyfgthyemqxeucn",
  },
});

const sendPasswordResetCode = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user with the provided email exists in your database
    const user = await Buyer.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a random reset code (you can customize the length and format)
    const code = Math.floor(1000 + Math.random() * 9000);
    // Store the reset code in the user's document in the database
    user.otp = code;
    await user.save();

    // Compose the email message
    const mailOptions = {
      from: "nickey968@gmail.com",
      to: email,
      subject: "Password Reset Code",
      text: `Your password reset code is: ${code}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to send reset code" });
      }

      console.log("Email sent: " + info.response);

      return res.status(200).json({ message: "Reset code sent successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { otp, password } = req.body;
    const { userID } = req.params;

    const user = await Buyer.findById({ _id: userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (otp !== user.otp) {
      return res.status(400).json({ error: "Invalid otp" });
    }
    const hashedPassword = await pass_hash.encrypt(password);
    user.password = hashedPassword;
    user.otp = null;

    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default {
  createAccount,
  buyerLogin,
  sendPasswordResetCode,
  changePassword,
  checkUser,
};
