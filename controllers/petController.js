const petModel = require("../models/petModel");

const validatePet = (body) => {
  const {
    nama,
    jenisHewan,
    umurBulan,
    harga,
  } = body;

  if (
    !nama ||
    !jenisHewan ||
    umurBulan === undefined ||
    harga === undefined
  ) {
    return "Field nama, jenisHewan, umurBulan, dan harga wajib diisi";
  }

  if (typeof umurBulan !== "number") {
    return "umurBulan harus berupa number";
  }

  if (typeof harga !== "number") {
    return "harga harus berupa number";
  }

  return null;
};

// GET /pets
const getPets = (req, res) => {
  const { jenisHewan } = req.query;

  if (jenisHewan) {
    const pets = petModel.getPetsByJenisHewan(jenisHewan);

    return res.status(200).json(pets);
  }

  const pets = petModel.getAllPets();

  res.status(200).json(pets);
};

// GET /pets/:id
const getPetById = (req, res) => {
  const id = parseInt(req.params.id);

  const pet = petModel.getPetById(id);

  if (!pet) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(pet);
};

// POST /pets
const createPet = (req, res) => {
  const validationError = validatePet(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const newPet = petModel.createPet({
    nama: req.body.nama,
    jenisHewan: req.body.jenisHewan,
    ras: req.body.ras || "",
    umurBulan: req.body.umurBulan,
    harga: req.body.harga,
  });

  res.status(201).json({
    status: "success",
    message: "Data hewan peliharaan berhasil ditambahkan",
    data: newPet,
  });
};

// PUT /pets/:id
const updatePet = (req, res) => {
  const id = parseInt(req.params.id);

  const existingPet = petModel.getPetById(id);

  if (!existingPet) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const validationError = validatePet(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const updatedPet = petModel.updatePet(id, {
    nama: req.body.nama,
    jenisHewan: req.body.jenisHewan,
    ras: req.body.ras || "",
    umurBulan: req.body.umurBulan,
    harga: req.body.harga,
  });

  res.status(200).json({
    status: "success",
    message: `Data hewan dengan id ${id} berhasil diubah`,
    data: updatedPet,
  });
};

// DELETE /pets/:id
const deletePet = (req, res) => {
  const id = parseInt(req.params.id);

  const existingPet = petModel.getPetById(id);

  if (!existingPet) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  petModel.deletePet(id);

  res.status(200).json({
    status: "success",
    message: `Data hewan dengan id ${id} berhasil dihapus`,
    data: null,
  });
};

module.exports = {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};