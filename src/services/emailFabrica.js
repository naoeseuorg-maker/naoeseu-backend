const sgMail = require("@sendgrid/mail");
const config = require("../config");

sgMail.setApiKey(config.email.sendgrid_key);

module.exports = {
  async enviar(pagamento) {
    const msg = {
      to: config.email.suporte_fabrica,
      from: config.email.remetente,
      subject: `Novo pagamento recebido — Pedido ${pagamento.txid}`,
      html: `
        <h2>Novo pagamento recebido</h2>
        <p>Um pedido foi pago via PIX.</p>

        <p><strong>TXID:</strong> ${pagamento.txid}</p>
        <p><strong>Valor:</strong> R$ ${pagamento.valor}</p>
        <p><strong>Horário:</strong> ${pagamento.horario}</p>

        <p>O pedido deve entrar em produção imediatamente.</p>
      `
    };

    try {
      await sgMail.send(msg);
      console.log("📨 Email enviado para a fábrica.");
    } catch (erro) {
      console.error("Erro ao enviar email para fábrica:", erro);
    }
  }
};
