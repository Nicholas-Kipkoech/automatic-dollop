import Expert from "../../databases/expert/ExpertModel.js";
import createToken from "../../utils/jwt.js";
import pass_hash from "../../utils/pass_hash.js";

const createAccount = async (req, res) => {
  try {
    const {
      email,
      password,
      full_name,
      country,
      city,
      street_address,
      building,
      services_offer,
      DOT_number,
    } = req.body;
    const exists = await Expert.findOne({ email: email });
    if (exists) {
      return res.status(400).json({ error: `${email} already exists` });
    }
    const hashPass = await pass_hash.encrypt(password);
    const new_expert = await Expert.create({
      email,
      password: hashPass,
      full_name,
      country,
      street_address,
      city,
      building,
      services_offer,
      DOT_number,
    });
    if (new_expert) return res.status(200).json({ new_expert: new_expert });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const expertLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const expert = await Expert.findOne({ email: email });
    if (!expert) {
      return res.status(404).json({ error: `${email} does not exists!` });
    }
    const isValidPassword = await pass_hash.compare(password, expert.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = createToken(expert.email);
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: expert,
      access_token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default { createAccount, expertLogin };
