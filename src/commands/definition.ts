import * as Discord from 'discord.js';

const urban = require('relevant-urban');
module.exports = {
    name: 'definition',
    description: "definition",
    async execute(message, args) {

        let str = args.join(' ');
        let filteredStr = str.replace(/[^\w\s]/gi, '');

        let result = await urban(filteredStr).catch(e => {
            return notFound();
        });

        if (typeof result !== "undefined") {
            const embed = new Discord.MessageEmbed()
            embed.setColor("RED")

            embed.setTitle(result.word.replace(/(^\w|\s\w)/g, m => m.toUpperCase()));
            embed.setURL(result.urbanURL);

            embed.setDescription(`:closed_book: **Definition:** \n *${result.definition}* \n\n :scroll: **Example:** \n  *${result.example}*`)

            embed.setFooter('Definition From Urban Dictionary')

            message.channel.send(embed);

            await message.react('✅')
        }

        function notFound() {
            message.channel.send('Word not found, please try another word.')
            message.react('❌')
        }

    }
}

