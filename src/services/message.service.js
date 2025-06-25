import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

class MessageService {
  async createMessage(data) {
    const { nom, email, sujet, message } = data;

    // Vérification des champs obligatoires
    if (!nom || nom.trim() === "") {
      throw new Error("Le champ 'nom' est obligatoire");
    }
    if (!email || email.trim() === "") {
      throw new Error("Le champ 'email' est obligatoire");
    }
    if (!sujet || sujet.trim() === "") {
      throw new Error("Le champ 'sujet' est obligatoire");
    }
    if (!message || message.trim() === "") {
      throw new Error("Le champ 'message' est obligatoire");
    }

    return prisma.message.create({
      data: {
        nom,
        email,
        sujet,
        message,
      },
    });
  }

  async getAllMessages() {
    return await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMessageById(id) {
    const message = await prisma.message.findUnique({
      where: { id: Number(id) },
    });
    if (!message) {
      throw new Error("Message introuvable");
    }
    return message;
  }

  async deleteMessage(id) {
    await prisma.message.delete({
      where: { id: Number(id) },
    });
    return { message: "Message supprimé avec succès" };
  }
}

export default new MessageService();
