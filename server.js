const express = require('express');
const path = require('path');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.login(process.env.BOT_TOKEN);

app.get('/messages/:channelId', async (req, res) => {
  // ... your existing logic
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
