import bcrypt from 'bcryptjs';
import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

class UserService {

    async register(data) {
        const {
            nom,
            prenom,
            email,
            telephone,
            password,
            image,
            bio,
            apropos,
            pays,
            ville,
            code_postal,
            maison,
            linkdin,
            github,
            x,
            instagram
        } = data;

        // Champs obligatoires
        if (!nom || !prenom || !email || !telephone || !password || !image) {
            throw new Error('Tous les champs obligatoires doivent être remplis');
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('Email déjà utilisé');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                nom,
                prenom,
                email,
                telephone,
                password: hashedPassword,
                image: image,
                bio: bio || "",
                apropos: apropos || "",
                pays: pays || "",
                ville: ville || "",
                code_postal: code_postal || "",
                maison: maison || "",
                linkdin: linkdin || "",
                github: github || "",
                x: x || "",
                instagram: instagram || "",
            },
        });

        return user;
    }

    async login(email, password) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error('Mot de passe incorrect');
        }

        return user;
    }

    async updateInfo(userId, data) {
        const existingUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!existingUser) {
            throw new Error("Utilisateur introuvable");
        }

        const {
            nom,
            prenom,
            email,
            telephone,
            image,
            bio,
            apropos,
            pays,
            ville,
            code_postal,
            maison,
            linkdin,
            github,
            x,
            instagram
        } = data;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                nom: nom ?? existingUser.nom,
                prenom: prenom ?? existingUser.prenom,
                email: email ?? existingUser.email,
                telephone: telephone ?? existingUser.telephone,
                image: image ?? existingUser.image,
                bio: bio ?? existingUser.bio,
                apropos: apropos ?? existingUser.apropos,
                pays: pays ?? existingUser.pays,
                ville: ville ?? existingUser.ville,
                code_postal: code_postal ?? existingUser.code_postal,
                maison: maison ?? existingUser.maison,
                linkdin: linkdin ?? existingUser.linkdin,
                github: github ?? existingUser.github,
                x: x ?? existingUser.x,
                instagram: instagram ?? existingUser.instagram,
            }
        });

        return updatedUser;
    }

}

export default new UserService();
