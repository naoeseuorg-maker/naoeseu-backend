module.exports = {
  gerarCobrancaSimulada(txid, dadosPedido) {

    return {
      qrCode: `QR_CODE_SIMULADO_${txid}`,
      copiaECola: `0002010102122685SIMULACAO${txid}5303986540`,
      valor: dadosPedido.valor || "75.00",
      mensagem: "Cobrança PIX simulada"
    };
  },

  simularWebhook(pagamento) {
    console.log("\n💰 [SIMULAÇÃO] Webhook PIX disparado...");
    console.log(pagamento);
  }
};
