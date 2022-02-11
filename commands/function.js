const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('function')
		.setDescription('Enable Usermanaging Option'),
	async execute(client, interaction, User, db, mongoose, DBConnect) {
        let warncount = await db.fetch(`warn_${interaction.guildId}_${interaction.user.id}`);
        warncount = Number(warncount);
        console.log(`Warnadd.js L11 - User ${interaction.user.id}'s warn count : ${warncount}`);
        
        if ( warncount != null ) {
            //warnadd and (execute punishment, later)
        }
        else{
            //update and pass
        }

        const PingEmbed = new MessageEmbed()
        .setColor('#CB7ACF')
        .setTitle(':ping_pong:\u0020\u0020Ping! Pong! ')
        .setAuthor('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676')
        .setDescription(`Ping : ${client.ws.ping}ms`)
        .addFields(
            { name: 'Requested by', value: `${interaction.user.username}, ${interaction.user.id}` }
        )
        .setTimestamp()
        .setFooter('StarByte', 'https://media.discordapp.net/attachments/786810256709255179/898209754533474324/StarByte.png?width=676&height=676');
		await interaction.reply({ embeds : [PingEmbed]});
	},
};