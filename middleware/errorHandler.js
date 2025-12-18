import logger from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl} - IP: ${req.ip}\nStack: ${err.stack}`);

  if (err.status) {
    const response = { error: err.message };
    if (err.errorCode) {
      response.errorCode = err.errorCode;
    }
    return res.status(err.status).json(response);
  }

  if (err.code === "P2002") {
    return res.status(409).json({ error: "Există deja un cont cu acest email." });
  }

  if (err.code === "P2003" || (err.message && err.message.includes("foreign key constraint"))) {
    return res.status(400).json({ error: "Nu se poate șterge. Are dependențe existente." });
  }

  // Fallback
  res.status(500).json({ error: "Eroare internă a serverului" });
}
