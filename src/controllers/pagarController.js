const pixService = require("../services/pixService");
const gerarTxid = require("../utils/gerarTxid");

exports.criarCobranca = async (req, res) => {
  try {
    const dadosPedido = req.body;

    // Gerar TXID único
    const txid = gerarTxid();

    // Gerar cobrança PIX ou simular cobrança
    const cobranca = await pixService.gerarCobranca(txid, dadosPedido);

    res.json({
      sucesso: true,
      txid,
      qrCode: cobranca.qrCode,
      copiaECola: cobranca.copiaECola
    });

  } catch (erro) {
    console.error("Erro ao criar cobrança PIX:", erro);
    res.status(500).json({ erro: "Erro ao criar cobrança PIX" });
  }
};
