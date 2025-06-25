import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

class SkillService {

    async createSkill(data) {
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
        const existingSkill = await prisma.skill.findFirst({ where: { libelle } });
        if (existingSkill) {
            throw new Error("Cette compétence existe déjà");
        }

        return prisma.skill.create({
            data: { libelle, description, image, active },
        });
    }

    async getAllSkills() {
        return await prisma.skill.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    async getSkillById(id) {
        const skill = await prisma.skill.findUnique({
            where: { id: parseInt(id) },
            include: { projets: true },
        });

        if (!skill) {
            throw new Error("Compétence non trouvée");
        }

        return skill;
    }

    async updateSkill(id, data) {
        const skill = await prisma.skill.update({
            where: { id: parseInt(id) },
            data,
        });

        return skill;
    }

    async deleteSkill(id) {
        await prisma.skill.delete({
            where: { id: parseInt(id) },
        });

        return { message: "Compétence supprimée avec succès" };
    }
}

export default new SkillService();
