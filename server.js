const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/postsRouter");
const authRouter = require("./routers/authRouter");
const routeNotFound = require("./middlewares/routeNotFound");
const cors = require('cors');


const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());


app.use(cors());
app.use("/posts", postsRouter);
app.use("/", authRouter);

app.use(routeNotFound);

app.listen(port, () => {
    console.log(`App attiva su http://localhost:${port}`);
});