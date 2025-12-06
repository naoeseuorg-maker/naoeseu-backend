module.exports = {
  // Porta usada pelo servidor
  PORT: process.env.PORT || 3000,

  // PIX — placeholders até a fábrica fornecer os dados reais
  pix: {
    client_id: process.env.PIX_CLIENT_ID || "CLIENT_ID_AQUI",
    client_secret: process.env.PIX_CLIENT_SECRET || "CLIENT_SECRET_AQUI",
    pix_key: process.env.PIX_KEY || "CHAVE_ALEATORIA_AQUI"
  },

  // E-mails
  email: {
    remetente: process.env.EMAIL_REMETENTE || "contato@naoeseu.org",
    suporte_fabrica: process.env.EMAIL_SUPORTE_FABRICA || "contato@naoeseu.org",
    sendgrid_key: process.env.SENDGRID_API_KEY || "SENDGRID_API_KEY_AQUI"
  },

  // Informações gerais do projeto
  projeto: {
    nome: "Seu Dinheiro Não é Seu",
    url_api: "https://naoeseu.org/api"
  },

  // Google Sheets (corrigido)
  sheets: {
    sheet_id: process.env.SHEET_ID,                         // ← Lido das variáveis de ambiente
    credentials_path: "/etc/secrets/google-credentials.json" // ← Arquivo secreto no Render
  },

  // Modo simulado para testes
  modoSimulado: process.env.MODO_SIMULADO || true
};
