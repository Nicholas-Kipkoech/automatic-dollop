import mongoose from "mongoose";

const expertDocumentsModel = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Expert", required: true },
  selfie_or_logo: { type: String, required: false },
  license_or_certificate: { type: String, required: false },
  insurance: { type: String, required: false },
});

const ExpertDocuments = mongoose.model("ExpertDocuments", expertDocumentsModel);
export default ExpertDocuments;
