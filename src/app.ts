import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
import { Message } from 'discord.js';

dotenv.config();
const client = new Discord.Client();

client.on('message', (message: Message) => {
    if (message.author != client.user) {
        message.reply(`Received ${message.content}`);
    }
});

client.login(<string> process.env.token);