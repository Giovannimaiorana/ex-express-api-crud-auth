const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/postsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const tagsRouter = require("./routers/tagsRouter");
const authRouter = require("./routers/authRouter");
const routeNotFound = require("./middlewares/routeNotFound");
const cors = require('cors');


const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());

app.use(cors());
//app.use(cors());
app.use("/posts", postsRouter);
app.use("/", categoriesRouter);
app.use("/", tagsRouter);
app.use("/", authRouter);



//app.use(cors({ origin: 'http://localhost:5173' }));
app.use(routeNotFound);

app.listen(port, () => {
    console.log(`App attiva su http://localhost:${port}`);
});