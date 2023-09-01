import mongoose from "mongoose";

const expertModel = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  street_address: { type: String, required: true },
  building: { type: String, required: false },
  services_offer: { type: String, required: true },
  DOT_number: { type: String, required: true },
});

const Expert = mongoose.model("Expert", expertModel);

export default Expert;
