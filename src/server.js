const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");

const pagarRoute = require("./routes/pagar");
const webhookRoute = require("./routes/webhook");
const testeSheetsRoute = require("./routes/testeSheets"); // <-- NOVO

const app = express();

app.use(cors());
app.use(bodyParser.json());

// -------------------------
// ROTAS PRINCIPAIS
// -------------------------
app.use("/api/pagar", pagarRoute);
app.use("/api/webhook-pix", webhookRoute);
app.use("/api/teste-sheets", testeSheetsRoute); // <-- NOVO

// -------------------------
// ROTA DE TESTE SIMPLES
// -------------------------
app.get("/", (req, res) => {
  res.send("API do projeto Seu Dinheiro Não é Seu está rodando.");
});

// -------------------------
// INICIALIZAR SERVIDOR
// -------------------------
app.listen(config.PORT, () => {
  console.log(`Servidor rodando na porta ${config.PORT}`);
});
