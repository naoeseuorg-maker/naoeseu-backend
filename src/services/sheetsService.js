const fs = require("fs");
const { google } = require("googleapis");
const config = require("../config");

module.exports = {
  async registrarPagamento(pagamento) {
    try {
      // --- 1) CARREGAR CREDENCIAIS DO ARQUIVO SECRETO ---
      const raw = fs.readFileSync(config.sheets.credentials_path, "utf8");
      const credentials = JSON.parse(raw);

      // --- 2) AUTENTICAÇÃO JWT ---
      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ["https://www.googleapis.com/auth/spreadsheets"]
      );

      const sheets = google.sheets({ version: "v4", auth });

      if (!config.sheets.sheet_id) {
        console.error("❌ ERRO FATAL: Variável SHEET_ID não foi definida.");
        return;
      }

      // --- 3) ESCREVER NA PLANILHA ---
      await sheets.spreadsheets.values.append({
        spreadsheetId: config.sheets.sheet_id,
        range: "Pedidos!A:D", // ✅ RANGE CORRIGIDO
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

      console.log("📄 Pagamento registrado com sucesso no Google Sheets!");

    } catch (err) {
      console.error("❌ Erro ao registrar pagamento no Sheets:", err);
    }
  }
};
