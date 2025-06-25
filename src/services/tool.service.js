import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

class ToolService {
  async createTool(data) {
    const { libelle, description, image, active } = data;

    if (!libelle || libelle.trim() === "") {
      throw new Error("Le champ 'libelle' est obligatoire");
    }
    if (!description || description.trim() === "") {
      throw new Error("Le champ 'description' est obligatoire");
    }
    if (!image || image.trim() === "") {
      throw new Error("Le champ 'image' est obligatoire");
    }
    if (active === undefined || active === null) {
      throw new Error("Le champ 'active' est obligatoire");
    }

    // Optionnel: vérifier doublon
    const existingTool = await prisma.tool.findFirst({
      where: {
        libelle: {
          equals: libelle,
        },
      },
    });
    if (existingTool) {
      throw new Error("Cet outil existe déjà");
    }

    return prisma.tool.create({
      data: { libelle, description, image, active },
    });
  }

  async getAllTools() {
    return await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getToolById(id) {
    const tool = await prisma.tool.findUnique({ where: { id: Number(id) } });
    if (!tool) {
      throw new Error("Outil introuvable");
    }
    return tool;
  }

  async updateTool(id, data) {
    return await prisma.tool.update({
      where: { id: Number(id) },
      data,
    });
  }

  async deleteTool(id) {
    await prisma.tool.delete({ where: { id: Number(id) } });
    return { message: "Outil supprimé avec succès" };
  }
}

export default new ToolService();
