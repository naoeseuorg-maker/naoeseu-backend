const { google } = require("googleapis");
const config = require("../config");

module.exports = {
  async registrarPagamento(pagamento) {
    try {
      const credentials = JSON.parse(config.sheets.credentials);
      const auth = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ["https://www.googleapis.com/auth/spreadsheets"]
      );

      const sheets = google.sheets({ version: "v4", auth });

      await sheets.spreadsheets.values.append({
        spreadsheetId: config.sheets.sheet_id,
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
      console.error("Erro ao registrar pagamento no Sheets:", erro);
    }
  }
};
