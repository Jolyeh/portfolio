import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();

class ProjectService {
    async createProject(data) {
        const { libelle, description, image1, image2, active, skills, lien_demo, lien_code } = data;

        // Vérifications de base
        if (!libelle || libelle.trim() === '') {
            throw new Error("Le champ 'libelle' est obligatoire");
        }
        if (!description || description.trim() === '') {
            throw new Error("Le champ 'description' est obligatoire");
        }
        if (!image1 || image1.trim() === '') {
            throw new Error("Le champ 'image1' est obligatoire");
        }
        if (!image2 || image2.trim() === '') {
            throw new Error("Le champ 'image2' est obligatoire");
        }
        if (active === undefined || active === null) {
            throw new Error("Le champ 'active' est obligatoire");
        }
        if (!Array.isArray(skills) || skills.length === 0) {
            throw new Error("Au moins un skill doit être lié au projet");
        }

        // 🔒 Vérification de doublon par libelle (sans sensibilité à la casse)
        const existingProject = await prisma.project.findFirst({
            where: {
                libelle: {
                    equals: libelle,
                },
            },
        });

        if (existingProject) {
            throw new Error(`Le projet existe déjà`);
        }

        // Validation des skills
        const skillIds = skills.map((skill) => {
            if (!skill || skill.id === undefined || skill.id === null) {
                throw new Error("Chaque skill doit avoir un 'id'");
            }

            const skillId = parseInt(skill.id, 10);

            if (isNaN(skillId) || skillId <= 0 || !Number.isInteger(skillId)) {
                throw new Error(`L'id du skill '${skill.id}' n'est pas un nombre entier positif valide`);
            }

            return skillId;
        });

        const existingSkills = await prisma.skill.findMany({
            where: { id: { in: skillIds } },
        });

        if (existingSkills.length !== skillIds.length) {
            throw new Error("Un ou plusieurs skills n'existent pas en base");
        }

        // Création du projet
        const project = await prisma.project.create({
            data: {
                libelle,
                description,
                image1,
                image2,
                active,
                lien_demo: lien_demo || '',
                lien_code: lien_code || '',
                skills: {
                    connect: skillIds.map((id) => ({ id })),
                },
            },
            include: {
                skills: true,
            },
        });

        return project;
    }


    async getProjectById(id) {
        const project = await prisma.project.findUnique({
            where: { id },
            include: { skills: true },
        });

        if (!project) {
            throw new Error("Projet introuvable");
        }
        return project;
    }

    async updateProject(id, data) {
        const { libelle, description, image1, image2, active, skills, lien_demo, lien_code } = data;

        // Construire l'objet à mettre à jour
        const updateData = {};

        if (libelle !== undefined) {
            if (libelle.trim() === '') throw new Error("Le champ 'libelle' ne peut pas être vide");
            updateData.libelle = libelle;
        }
        if (description !== undefined) {
            if (description.trim() === '') throw new Error("Le champ 'description' ne peut pas être vide");
            updateData.description = description;
        }
        if (image1 !== undefined) {
            if (image1.trim() === '') throw new Error("Le champ 'image1' ne peut pas être vide");
            updateData.image1 = image1;
        }
        if (image2 !== undefined) {
            if (image2.trim() === '') throw new Error("Le champ 'image2' ne peut pas être vide");
            updateData.image2 = image2;
        }
        if (active !== undefined) {
            if (typeof active !== 'boolean') throw new Error("Le champ 'active' doit être un booléen");
            updateData.active = active;
        }
        if (lien_demo !== undefined) {
            updateData.lien_demo = lien_demo || "";
        }
        if (lien_code !== undefined) {
            updateData.lien_code = lien_code || "";
        }

        if (skills !== undefined) {
            if (!Array.isArray(skills)) {
                throw new Error("Le champ 'skills' doit être un tableau");
            }
            // Disconnect all previous skills and connect les nouveaux
            updateData.skills = {
                set: [], // déconnecter tous
            };
        }

        // Mise à jour du projet (sans skills pour l'instant)
        const updatedProject = await prisma.project.update({
            where: { id },
            data: updateData,
            include: { skills: true },
        });

        // Si on doit gérer les skills (déconnecter/connecter)
        if (skills !== undefined) {
            await prisma.project.update({
                where: { id },
                data: {
                    skills: {
                        connect: skills.map(({ id }) => ({ id })),
                    },
                },
            });

            // Recharger le projet avec les skills mis à jour
            return await this.getProjectById(id);
        }

        return updatedProject;
    }

    async deleteProject(id) {
        // Optionnel: vérifier que le projet existe
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project) {
            throw new Error("Projet introuvable");
        }

        await prisma.project.delete({ where: { id } });
        return { message: "Projet supprimé avec succès" };
    }

    async listProjects() {
        return await prisma.project.findMany({
            include: { skills: true },
            orderBy: { createdAt: 'desc' }
        });
    }
}

export default new ProjectService();
