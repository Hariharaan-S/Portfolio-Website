import Contact from "../models/Contact.js";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.query;
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await contact.save();
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
};
