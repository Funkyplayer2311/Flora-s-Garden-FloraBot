const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
app.use(cors());

require('dotenv').config();

// Initialize Discord bot client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Login with your bot token
client.login(process.env.BOT_TOKEN); // 🔐 Replace with your actual bot token

// Endpoint to fetch recent messages from a channel
app.get('/messages/:channelId', async (req, res) => {
  try {
    const channelId = req.params.channelId;
    const channel = await client.channels.fetch(channelId);

    if (!channel || !channel.isTextBased()) {
      return res.status(400).json({ error: 'Invalid or non-text channel.' });
    }

    const messages = await channel.messages.fetch({ limit: 20 });

    const formatted = messages.map(msg => ({
      author: msg.author.username,
      content: msg.content,
      timestamp: msg.createdTimestamp
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

