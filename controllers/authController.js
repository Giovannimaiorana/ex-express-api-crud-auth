const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


async function register(req, res) {
    const sanitizedData = matchedData(req);
    //cript password
    const { role, ...userData } = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
        data: {
            ...userData
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        }
    });
    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    res.json({ user, token });
}




async function login(req, res) {
    //recuperare dati inseriti
    const { email, password } = req.body;
    console.log(password);
    //controllopresenza utente
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: true,
        }
    });
    if (!user) {
        throw new Error("Utente non trovato");
    }
    //controllo se password è corretta

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
        throw new Error("password non corretta");
    }
    //genero token 
    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    delete user.password;
    res.json({ user, token });
}
module.exports = {
    register,
    login
}