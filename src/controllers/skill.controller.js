import skillService from "../services/skill.service.js";

export const createSkill = async (req, res) => {
  try {
    const skill = await skillService.createSkill(req.body);
    res.status(201).json({
      status: true,
      message: "Compétence créée avec succès",
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skills = await skillService.getAllSkills();
    res.json({
      status: true,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getSkillById = async (req, res) => {
  try {
    const skill = await skillService.getSkillById(req.params.id);
    res.json({
      status: true,
      data: skill,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await skillService.updateSkill(req.params.id, req.body);
    res.json({
      status: true,
      message: "Compétence mise à jour avec succès",
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const result = await skillService.deleteSkill(req.params.id);
    res.json({
      status: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
