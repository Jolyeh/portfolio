import projectService from '../services/project.service.js';

export const createProject = async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json({
      status: true,
      message: "Projet créé avec succès",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.listProjects();
    res.json({
      status: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(Number(req.params.id));
    res.json({
      status: true,
      data: project,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await projectService.updateProject(Number(req.params.id), req.body);
    res.json({
      status: true,
      message: "Projet mis à jour avec succès",
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const result = await projectService.deleteProject(Number(req.params.id));
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
