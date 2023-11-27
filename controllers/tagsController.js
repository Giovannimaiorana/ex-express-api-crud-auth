const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


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
    store
}