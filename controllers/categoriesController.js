const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { kebabCase } = require("lodash");

async function isSlugExists(slug) {
    const existingSlug = await prisma.category.findUnique({
        where: {
            slug: slug,
        },
    });

    return existingSlug !== null;
}

async function index(req, res) {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error('Errore durante il recupero dei tag:', error);
        res.status(500).json({ error: 'Errore durante il recupero dei tag' });
    }
}
//genera uno slug univoco con counter vicino se già presente 
async function generateUniqueSlug(baseSlug) {
    let slug = baseSlug;
    let counter = 1;

    while (await isSlugExists(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}


async function store(req, res) {

    const insertData = req.body;
    const baseSlug = kebabCase(insertData.name);
    const uniqueSlug = await generateUniqueSlug(baseSlug);
    const slugExists = await isSlugExists(uniqueSlug);
    const newCategory = await prisma.category.create({
        data: {
            name: insertData.name,
            slug: uniqueSlug,

        }
    });


    return res.json(newCategory);
}
module.exports = {
    index,
    store
}