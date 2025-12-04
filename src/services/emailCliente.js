const sgMail = require("@sendgrid/mail");
const config = require("../config");

sgMail.setApiKey(config.email.sendgrid_key);

module.exports = {
  async enviar(pagamento) {
    const msg = {
      to: pagamento.nome || "cliente",
      from: config.email.remetente,
      subject: `Pagamento confirmado — ${config.projeto.nome}`,
      html: `
        <h2>Seu pagamento foi confirmado!</h2>
        <p>Recebemos seu pagamento via PIX.</p>
        <p><strong>TXID:</strong> ${pagamento.txid}</p>
        <p>Seu pedido agora entrou em produção. Obrigado por apoiar nossa causa.</p>
      `
    };

    try {
      await sgMail.send(msg);
      console.log("📨 Email enviado para cliente.");
    } catch (erro) {
      console.error("Erro ao enviar email para cliente:", erro);
    }
  }
};
