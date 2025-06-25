import messageService from "../services/message.service.js";

export const createMessage = async (req, res) => {
  try {
    const message = await messageService.createMessage(req.body);
    res.status(201).json({
      status: true,
      message: "Message envoyé avec succès",
      data: message,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.json({ status: true, data: messages });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await messageService.getMessageById(req.params.id);
    res.json({ status: true, data: message });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const result = await messageService.deleteMessage(req.params.id);
    res.json({ status: true, message: result.message });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
