import { Schema, model } from "mongoose";

const expertDocumentsModel = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Expert", required: true },
  selfie_or_logo: { type: String, required: false },
  license_or_certificate: { type: String, required: false },
  insurance: { type: String, required: false },
});

const ExpertDocuments = model("ExpertDocuments", expertDocumentsModel);
export default ExpertDocuments;
