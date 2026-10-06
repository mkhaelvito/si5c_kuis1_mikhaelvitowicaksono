let pets = [
  {
    id: 1,
    nama: "Mochi",
    jenisHewan: "kucing",
    ras: "Persia",
    umurBulan: 4,
    harga: 2500000,
  },
  {
    id: 2,
    nama: "Oreo",
    jenisHewan: "anjing",
    ras: "Pomeranian",
    umurBulan: 8,
    harga: 3500000,
  },
  {
    id: 3,
    nama: "Milo",
    jenisHewan: "kucing",
    ras: "Anggora",
    umurBulan: 6,
    harga: 1800000,
  },
];

let nextId = 4;

const getAllPets = () => {
  return pets;
};

const getPetById = (id) => {
  return pets.find((pet) => pet.id === id);
};

const getPetsByJenisHewan = (jenisHewan) => {
  return pets.filter(
    (pet) =>
      pet.jenisHewan.toLowerCase() === jenisHewan.toLowerCase()
  );
};

const createPet = (petData) => {
  const newPet = {
    id: nextId++,
    ...petData,
  };

  pets.push(newPet);

  return newPet;
};

const updatePet = (id, petData) => {
  const index = pets.findIndex((pet) => pet.id === id);

  if (index === -1) {
    return null;
  }

  const updatedPet = {
    id,
    ...petData,
  };

  pets[index] = updatedPet;

  return updatedPet;
};

const deletePet = (id) => {
  const index = pets.findIndex((pet) => pet.id === id);

  if (index === -1) {
    return false;
  }

  pets.splice(index, 1);

  return true;
};

module.exports = {
  getAllPets,
  getPetById,
  getPetsByJenisHewan,
  createPet,
  updatePet,
  deletePet,
};