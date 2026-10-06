const express = require("express");

const router = express.Router();

const petController = require("../controllers/petController");
const cekApiKey = require("../middlewares/cekApiKey");

router.get("/", petController.getPets);

router.get("/:id", petController.getPetById);

router.post("/", cekApiKey, petController.createPet);

router.put("/:id", cekApiKey, petController.updatePet);

router.delete("/:id", cekApiKey, petController.deletePet);

module.exports = router;