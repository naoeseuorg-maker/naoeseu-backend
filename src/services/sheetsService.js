const { google } = require("googleapis");
const fs = require("fs");

// Caminho do arquivo secreto enviado ao Render
const PATH_CREDENTIALS = "/etc/secrets/google-credentials.json";

// Carrega credenciais do Google a partir do Secret File
let credenciais;

try {
  const raw = fs.readFileSync(PATH_CREDENTIALS, "utf8");
  credenciais = JSON.parse(raw);
  console.log("🔐 Credenciais do Google carregadas com sucesso.");
} catch (err) {
  console.error("❌ Erro ao carregar credenciais do Google:", err);
}

module.exports = {
  async registrarPagamento(pagamento) {
    try {
      // Autenticação JWT usando as credenciais carregadas do arquivo
      const auth = new google.auth.JWT(
        credenciais.client_email,
        null,
        credenciais.private_key,
        ["https://www.googleapis.com/auth/spreadsheets"]
      );

      const sheets = google.sheets({ version: "v4", auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,   // RECOMENDADO: mover para env
        range: "Pedidos!A1",
        valueInputOption: "RAW",
        resource: {
          values: [
            [
              pagamento.txid,
              pagamento.valor,
              pagamento.horario,
              "PAGO"
            ]
          ]
        }
      });

      console.log("📄 Pagamento registrado na planilha.");

    } catch (erro) {
      console.error("❌ Erro ao registrar pagamento no Sheets:", erro);
    }
  }
};
