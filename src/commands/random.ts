import * as Discord from 'discord.js';
const urban = require('relevant-urban');

module.exports = {
    name: 'random',
    description: "random",
    async execute(message, args) {

        let result = await urban(args).catch(e => {
            return;
        });

        if (typeof result !== "undefined") {
            const embed = new Discord.MessageEmbed()
            embed.setColor("RED")
            embed.setTitle('Random Word: ' + result.word.replace(/(^\w|\s\w)/g, m => m.toUpperCase()));
            embed.setURL(result.urbanURL);
            embed.setDescription(`:closed_book: **Definition:** \n *${result.definition}* \n\n :scroll: **Example:** \n  *${result.example}*`)

            embed.setFooter('!random to turn random mode off')

            message.channel.send(embed);
        }

    }
}

