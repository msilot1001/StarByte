const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('agree')
		.setDescription('Agrees with the terms of service.'),
	async execute(client, interaction, userinfo) {
        if (userinfo.agree == true) {
            const Embed = new MessageEmbed()
            .setColor('#CB7ACF')
            .setTitle('You are already agreed!')
            .setAuthor('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676')
            .setDescription(`You can use the services`)
            .addFields(
                { name: 'Requested by', value: `${userinfo.username}, ${userinfo.id}` }
            )
            .setTimestamp()
            .setFooter('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676');
            await interaction.reply({ embeds : [Embed]});
        }
        else{
            const Embed = new MessageEmbed()
            .setColor('#CB7ACF')
            .setTitle(':regional_indicator_o:\u0020\u0020Agreement\u0020\u0020:regional_indicator_x:')
            .setAuthor('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676')
            .setDescription(`If you agree with the terms of service, reaction to this message with :o: or not, react with :x:`)
            .addFields(
                { name: 'Requested by', value: `${userinfo.username}, ${userinfo.id}` }
            )
            .setTimestamp()
            .setFooter('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676');
            await interaction.reply({ embeds : [Embed]});
            const filter = (reaction, user) => {
                return reaction.emoji.name === ':o:' || reaction.emoji.name === ':x:'&& user.id === interaction.user.id;
            };
    
            const collector = interaction.createReactionCollector({filter, time : 60});
    
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            });
            
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });
        }
	},
};
