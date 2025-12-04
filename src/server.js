const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const pagarRoute = require("./routes/pagar");
const webhookRoute = require("./routes/webhook");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas principais
app.use("/api/pagar", pagarRoute);
app.use("/api/webhook-pix", webhookRoute);

// Rota de teste (opcional)
app.get("/", (req, res) => {
  res.send("API do projeto Seu Dinheiro Não é Seu está rodando.");
});

// Inicializar servidor
app.listen(config.PORT, () => {
  console.log(`Servidor rodando na porta ${config.PORT}`);
});
