const jsonwebtoken = require("jsonwebtoken");
module.exports = (req, res, next) => {
    //leggere bearer token 
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
        throw new Error("Bearer token mancante o malformato");
    }

    const token = bearer.split(" ")[1];
    console.log(token);

    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    req["user"] = user;
    next();
}