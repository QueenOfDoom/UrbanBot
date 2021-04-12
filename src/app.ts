import * as Discord from 'discord.js';
import * as dotenv from 'dotenv';
import { Message } from 'discord.js';

dotenv.config();
const client = new Discord.Client();
const urban = require('relevant-urban');

client.on('message', async (message: Message) => {

    if (message.author != client.user) {

            let result = await urban(message.content).catch(e => {
                return message.channel.send('Word not found, please try another word.');
            })

            const embed = new Discord.MessageEmbed()
            embed.setColor("RED")
            embed.setTitle(result.word.charAt(0).toUpperCase() + result.word.slice(1))
            embed.setDescription(`**Definition:** \n *${result.definition}* \n\n **Example:** \n  *${result.example}*`)

            embed.setFooter('Definition From Urban Dictionary')

            message.channel.send(embed);

            await message.react('✅')
    }

});

client.login(<string> process.env.token);