import ExpertDocuments from "../../databases/expert/Documents.js";
import Expert from "../../databases/expert/ExpertModel.js";

const uploadDocuments = async (req, res) => {
  try {
    const userID = req.params.userID;

    const expert = await Expert.findOne({ _id: userID });
    if (!expert) {
      return res.status(404).json({ message: "Expert  not found" });
    }
    const { selfie_or_logo, license_or_certificate, insurance } = req.files;

    const document = new ExpertDocuments({
      user: expert._id,
      selfie_or_logo: selfie_or_logo[0].path,
      license_or_certificate: license_or_certificate[0].path,
      insurance: insurance[0].path,
    });

    // Save the document
    await document.save();

    return res
      .status(200)
      .json({ message: "Files uploaded successfully", files: document });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export default uploadDocuments;
