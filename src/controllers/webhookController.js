const emailCliente = require("../services/emailCliente");
const emailFabrica = require("../services/emailFabrica");
const sheetsService = require("../services/sheetsService");

exports.receberWebhook = async (req, res) => {
  try {
    const evento = req.body;

    if (!evento.pix || evento.pix.length === 0) {
      return res.status(200).send("OK");
    }

    const pagamento = evento.pix[0];

    // Processar
    await emailCliente.enviar(pagamento);
    await emailFabrica.enviar(pagamento);
    await sheetsService.registrarPagamento(pagamento);

    console.log("Pagamento registrado:", pagamento.txid);

    // Responder o webhook da Efi
    res.status(200).send("Webhook recebido");

  } catch (erro) {
    console.error("Erro no webhook:", erro);
    res.status(500).send("Erro no processamento do webhook");
  }
};
