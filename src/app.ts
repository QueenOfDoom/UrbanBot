import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();
const client = new Discord.Client();
const fs = require('fs-extra');

const prefix = '!';

let random: boolean = false;

// @ts-ignore
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // @ts-ignore
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    // @ts-ignore
    const command = args.shift().toLowerCase();

    if (command === 'def') {
        // @ts-ignore
        client.commands.get('definition').execute(message, args);
    }

    if (command === 'hey') {
        // @ts-ignore
        client.commands.get('hey').execute(message, args);
    }

    if (command === 'random') {
        if (random) {
            message.channel.send('Random Mode: OFF :red_circle: ');
            random = false;
        } else {
            message.channel.send('Random Mode: ON :green_circle:');
            random = true;
        }
    }

});

client.on('message', message => {
    if (random) {
        if (message.content.startsWith(prefix) || message.author.bot) return;
        let filteredStr = message.content.replace(/[^\w\s]/gi, '');
        let singleSpacedStr = filteredStr.replace(/\s\s+/g, ' ');
        let wordArray: Array<string> = singleSpacedStr.split(' ');

        let num: number = wordArray.length - 1;

        if (getRandomInt(0, 100) > 50) {
            let randomInt: number = getRandomInt(0, num);
            let word: string = wordArray[randomInt];
            // @ts-ignore
            client.commands.get('random').execute(message, word);
        }
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.login(<string>process.env.token);