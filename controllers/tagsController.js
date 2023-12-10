const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function index(req, res) {
    try {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    } catch (error) {
        console.error('Errore durante il recupero dei tag:', error);
        res.status(500).json({ error: 'Errore durante il recupero dei tag' });
    }
}


async function store(req, res) {

    const insertData = req.body;

    const result = await prisma.tag.create({
        data: {
            titleT: insertData.titleT,
        }
    })

    return res.json(result);
}




module.exports = {
    index,
    store
}