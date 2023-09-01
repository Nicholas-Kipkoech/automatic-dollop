import mongoose from "mongoose";

const buyerModel = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  location: { type: String, required: true },
  phone_number: { type: String, required: true },
  account_type: {
    type: String,
    enum: ["Car_dealer", "Motorist"],
    default: "Motorist",
  },
  otp: { type: Number, required: false },
  know_us: { type: String, required: false },
  referral_code: { type: String, required: false },
  benefit_code: { type: String, required: false },
});

const Buyer = mongoose.model("Buyer", buyerModel);

export default Buyer;
