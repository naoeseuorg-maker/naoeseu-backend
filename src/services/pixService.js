const axios = require("axios");
const config = require("../config");
const modoSimulado = require("../utils/modoSimulado");

async function gerarCobrancaReal(txid, dadosPedido) {
  try {
    const auth = Buffer.from(`${config.pix.client_id}:${config.pix.client_secret}`).toString("base64");

    const res = await axios.put(
      `https://api.efi.com.br/v2/cob/${txid}`,
      {
        calendario: { expiracao: 3600 },
        valor: { original: dadosPedido.valor.toString() },
        chave: config.pix.pix_key,
        infoAdicionais: [
          { nome: "Pedido", valor: dadosPedido.pedido },
          { nome: "Cliente", valor: dadosPedido.nome }
        ]
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json"
        }
      }
    );

    const qr = await axios.get(
      `https://api.efi.com.br/v2/loc/${res.data.loc.id}/qrcode`,
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );

    return {
      qrCode: qr.data.imagemQrcode,
      copiaECola: qr.data.qrcode
    };

  } catch (erro) {
    console.error("Erro ao gerar cobrança PIX real:", erro.response?.data || erro);
    throw erro;
  }
}

module.exports = {
  async gerarCobranca(txid, dadosPedido) {
    if (config.modoSimulado === true || config.pix.client_id === "CLIENT_ID_AQUI") {
      console.log("🔄 MODO SIMULADO ATIVO — Gerando cobrança falsa.");
      return modoSimulado.gerarCobrancaSimulada(txid, dadosPedido);
    }

    return gerarCobrancaReal(txid, dadosPedido);
  }
};
