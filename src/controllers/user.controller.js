import userService from "../services/user.service.js";

export const register = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    return res.status(201).json({
      status: true,
      message: "Inscription réussie",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Vérifie si l'email et le mot de passe sont fournis
      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "Email et mot de passe requis",
        });
      }
  
      const user = await userService.login(email, password);
  
      return res.json({
        status: true,
        message: "Connexion réussie",
        data: user,
      });
    } catch (error) {
      return res.status(401).json({
        status: false,
        message: error.message,
      });
    }
  };

  export const updateInfo = async (req, res) => {
    try {
      const userId = parseInt(req.params.id); // ou depuis req.user.id si authentifié
      const updatedUser = await userService.updateInfo(userId, req.body);
  
      return res.json({
        status: true,
        message: "Informations mises à jour avec succès",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
  