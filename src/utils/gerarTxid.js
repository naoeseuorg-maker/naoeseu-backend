module.exports = function gerarTxid() {
  const random = Math.random().toString(36).substring(2, 12).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `TXID${timestamp}${random}`.substring(0, 32); // Limite da Efi
};
