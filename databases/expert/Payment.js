import { Schema, model } from "mongoose";

const expertPayment = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Expert", required: true },
  bank: { type: String, required: true },
  branch: { type: String, required: true },
  account_holder_name: { type: String, required: true },
  account_name: { type: String, required: true },
  routing: { type: String, required: true },
  know_us: { type: String, required: true },
  refferal_code: { type: String, required: true },
});

const expertPayments = model("expertPayment", expertPayment);
export default expertPayments;
