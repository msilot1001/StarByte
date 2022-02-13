const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnreset')
		.setDescription('Reset Warning of User'),
	async execute(client, interaction, User, db, mongoose, DBConnect) {
        const target = interaction.options.getUser('target');

        let warncount = await db.fetch(`warn_${interaction.guildId}_${target.id}`);
        warncount = Number(warncount);
        console.log(`Warnstatus.js L11 - User ${target.id}'s warn count : ${warncount}`);

        await db.set(`warn_${interaction.guildId}_${target.id}`, 0)
        

        const WarnEmbed = new MessageEmbed()
        .setColor('#CB7ACF')
        .setTitle(':hammer:\u0020\u0020Warning! ')
        .setAuthor('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676')
        .setDescription(`${target}'s Warning Reseted.`)
        .addFields(
            { name: 'Requested by', value: `${target.username}, ${target.id}` }
        )
        .setTimestamp()
        .setFooter('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676');
		await interaction.reply({ embeds : [WarnEmbed]});
	},
};