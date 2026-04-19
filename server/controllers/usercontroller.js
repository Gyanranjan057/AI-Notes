import usermodel from "../models/usermodel.js"
export const getCurrentuser = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(200).json(null); 
    }

    const user = await usermodel.findById(req.userId);

    if (!user) {
      return res.status(200).json(null);
    }

    return res.status(200).json(user);

  } catch (error) {
    return res.status(200).json(null); // 👈 prevent crash
  }
};