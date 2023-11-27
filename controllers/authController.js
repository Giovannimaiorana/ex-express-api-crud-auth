const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function register(req, res) {
    res.send("register")
}
async function login(req, res) {
    res.send("login")
}
module.exports = {
    register,
    login
}