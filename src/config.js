module.exports = {
  PORT: process.env.PORT || 3000,

  // PIX - placeholders até a fábrica fornecer os dados reais
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

  // Projeto
  projeto: {
    nome: "Seu Dinheiro Não é Seu",
    url_api: "https://naoeseu.org/api"
  },

  // Google Sheets
  sheets: {
    sheet_id: process.env.SHEET_ID || "SHEET_ID_AQUI",
    credentials: process.env.GOOGLE_CREDENTIALS || "GOOGLE_CREDS_AQUI"
  },

  // Modo simulado para testes enquanto a fábrica não gera as credenciais reais
  modoSimulado: process.env.MODO_SIMULADO || true
};
