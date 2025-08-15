const mineflayer = require("mineflayer");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000; // Puerto dinámico para Render

// Servidor web mínimo para UptimeRobot
app.get("/", (req, res) => {
  res.send("Bot MineHaven activo!");
});

app.listen(port, () => {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});

// Función para iniciar el bot
function startBot() {
  const bot = mineflayer.createBot({
    host: "MineHaven.aternos.me", // IP o dominio de tu servidor
    port: 61127,
    username: "BotIdle"
  });

  bot.once("login", () => {
    console.log("Bot conectado al servidor MineHaven!");
  });

  bot.on("end", () => {
    console.log("Bot desconectado, reconectando en 2 minutos...");
    setTimeout(startBot, 2 * 60 * 1000); // reconectar cada 2 minutos
  });

  bot.on("error", (err) => {
    console.log("AFKBot got an error:", err.message);
    // Ignorar ETIMEDOUT u otros errores temporales
  });

  bot.on("kicked", (reason) => {
    console.log("Bot fue expulsado:", reason);
    setTimeout(startBot, 2 * 60 * 1000);
  });
}

// Iniciar el bot por primera vez
startBot();
