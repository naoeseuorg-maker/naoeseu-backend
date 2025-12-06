const express = require("express");
const router = express.Router();
const sheetsService = require("../services/sheetsService");

router.get("/", async (req, res) => {
  try {
    const pagamentoTeste = {
      txid: "TESTE_SHEETS",
      valor: "0.00",
      horario: new Date().toISOString()
    };

    await sheetsService.registrarPagamento(pagamentoTeste);

    res.json({
      status: "ok",
      mensagem: "Teste enviado para o Google Sheets."
    });

  } catch (erro) {
    console.error("Erro no teste Sheets:", erro);
    res.status(500).json({ erro: "Falha ao registrar no Sheets" });
  }
});

module.exports = router;
