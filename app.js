const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const logger = require("./middlewares/logger");
const petRoutes = require("./routes/petRoutes");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    nama: "Mikhael Vito Wicaksono",
    npm: "2428240133",
    topik: 21,
    topikNama: "Pet Shop - Hewan Peliharaan",
    resource: "/pets",
    endpoints: [
      "GET /pets",
      "GET /pets/:id",
      "GET /pets?jenisHewan=kucing",
      "POST /pets",
      "PUT /pets/:id",
      "DELETE /pets/:id",
    ],
  });
});

app.use("/pets", petRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server berjalan di http://localhost:${PORT}`
  );
});