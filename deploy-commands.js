const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId,  token } = require('./config.json');

const commands = [
    // * ping
	new SlashCommandBuilder().setName('ping')
	.setDescription('Replies Ping!'),
    // * work
	new SlashCommandBuilder().setName('work')
	.setDescription('Work to earn money!'),
    // * wallet
	new SlashCommandBuilder().setName('wallet')
	.setDescription('Checks your wallet balance'),
    // * warnadd
	new SlashCommandBuilder().setName('warnadd').setDescription('Add Warning to User')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount of Warning').setRequired(true))
    .addUserOption(option=>option.setName('target').setDescription('User').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason').setRequired(true)),
    // * warnremove
	new SlashCommandBuilder().setName('warnremove').setDescription('Decrease Warning to User')
    .addIntegerOption(option => option.setName('amount').setDescription('Amount of Warning').setRequired(true))
    .addUserOption(option=>option.setName('target').setDescription('User').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason').setRequired(true)),
    // * warnstatus
    new SlashCommandBuilder().setName('warnstatus').setDescription('Display Warning of User')
    .addUserOption(option=>option.setName('target').setDescription('User').setRequired(true)),
    // * function
	new SlashCommandBuilder().setName('function').setDescription('Add Function to your server')
    .addSubcommand(subcommand =>
		subcommand
			.setName('usermanage')
			.setDescription('Enable Usermanaging Option')
			.addBooleanOption(option => option.setName('activate').setDescription('Activate'))),
    // * configoption
    // new SlashCommandBuilder().setName('configoption').setDescription('Configure Options of StarByte to server')
    // .addSubcommand(subcommand => subcommand
    //     .setName(''))
]

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log(`Successfully registered application commands. : ${commands}`))
	.catch(console.error);