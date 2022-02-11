const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnstatus')
		.setDescription('Display Warning of User'),
	async execute(client, interaction, User, db, mongoose, DBConnect) {
        let warncount = await db.fetch(`warn_${interaction.guildId}_${interaction.user.id}`);
        warncount = Number(warncount);
        console.log(`Warnstatus.js L11 - User ${interaction.user.id}'s warn count : ${warncount}`);
        
        const target = interaction.options.getUser('target');
        const WarnEmbed = new MessageEmbed()
        .setColor('#CB7ACF')
        .setTitle(':hammer:\u0020\u0020Warning! ')
        .setAuthor('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676')
        .setDescription(`${target}'s Current Warning : ${warncount}`)
        .addFields(
            { name: 'Requested by', value: `${interaction.user.username}, ${interaction.user.id}` }
        )
        .setTimestamp()
        .setFooter('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676');
		await interaction.reply({ embeds : [WarnEmbed]});
	},
};