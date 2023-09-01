import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

const createToken = (email) => {
  const token = jwt.sign({ data: email }, jwt_secret, {
    expiresIn: "1h",
  });
  return token;
};

export default createToken;
