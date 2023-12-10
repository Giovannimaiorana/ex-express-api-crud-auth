const { Router } = require('express');
const router = Router();
const categoriesController = require("../controllers/categoriesController");

router.get('/categories', categoriesController.index);
router.post("/categories", categoriesController.store)

module.exports = router;