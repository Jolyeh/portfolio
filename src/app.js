import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.route.js';
import skillRoutes from './routes/skill.route.js';
import projectRoutes from './routes/project.route.js';
import toolRoutes from './routes/tool.route.js';
import messageRoutes from './routes/message.route.js';
import { PrismaClient } from './generated/prisma/client.js';
import messageService from './services/message.service.js';


const prisma = new PrismaClient();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

//routes vue
app.get('/', async (req, res) => {
    try {
        const [skills, projects, tools, user] = await Promise.all([
            prisma.skill.findMany({
                where: { active: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.project.findMany({
                where: { active: true },
                include: { skills: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.tool.findMany({
                where: { active: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.findFirst(),
        ]);

        res.render('index', {
            skills,
            projects,
            tools,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors du chargement des données");
    }
});
app.post('/contact', async (req, res) => {
    const { nom, email, message, sujet } = req.body;

    try {
        const message = await messageService.createMessage(req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send("Erreur lors de l'envoi du formulaire");
    }
});


// routes api
app.use('/api/user', userRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/tool', toolRoutes);
app.use('/api/message', messageRoutes);

export default app;