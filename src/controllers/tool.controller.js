import toolService from "../services/tool.service.js";

export const createTool = async (req, res) => {
  try {
    const tool = await toolService.createTool(req.body);
    res.status(201).json({
      status: true,
      message: "Outil créé avec succès",
      data: tool,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getAllTools = async (req, res) => {
  try {
    const tools = await toolService.getAllTools();
    res.json({ status: true, data: tools });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getToolById = async (req, res) => {
  try {
    const tool = await toolService.getToolById(req.params.id);
    res.json({ status: true, data: tool });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

export const updateTool = async (req, res) => {
  try {
    const tool = await toolService.updateTool(req.params.id, req.body);
    res.json({
      status: true,
      message: "Outil mis à jour avec succès",
      data: tool,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteTool = async (req, res) => {
  try {
    const result = await toolService.deleteTool(req.params.id);
    res.json({ status: true, message: result.message });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};
