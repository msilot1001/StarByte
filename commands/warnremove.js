const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warnremove')
		.setDescription('ecrease Warning to User'),
	async execute(client, interaction, User, db, mongoose, DBConnect) {
        const amount = interaction.options.getInteger('amount');
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');
        
        let warncount = await db.fetch(`warn_${interaction.guildId}_${target.id}`);
        warncount = Number(warncount);
        console.log(`Warnremove.js L11 - User ${target.id}'s warn count : ${warncount}`);

        warncount -= Number(amount)

        await db.set(`warn_${interaction.guildId}_${target.id}`, warncount)

        const WarnEmbed = new MessageEmbed()
        .setColor('#CB7ACF')
        .setTitle(':hammer:\u0020\u0020Warning! ')
        .setAuthor('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676')
        .setDescription(`${amount} warn was removed to ${target} \nCurrent Warning : ${warncount}\n**Reason** : ${reason}`)
        .addFields(
            { name: 'Requested by', value: `${target.username}, ${target.id}` }
        )
        .setTimestamp()
        .setFooter('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676');
		await interaction.reply({ embeds : [WarnEmbed]});
	},
};