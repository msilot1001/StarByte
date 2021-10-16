const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');



const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with Ping!'),
	new SlashCommandBuilder().setName('agree').setDescription('Agree the bot’s terms and conditions'),
	new SlashCommandBuilder().setName('work').setDescription('Earns money by working'),
	new SlashCommandBuilder().setName('wallet').setDescription('Replies wallet’s balance'),
	new SlashCommandBuilder().setName('bank').setDescription('Replies bank’s balance'),
	new SlashCommandBuilder().setName('deposit').setDescription('Deposit money to the bank'),
	new SlashCommandBuilder().setName('withdraw').setDescription('Withdraw money to the bank'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log(`Successfully registered application commands. : ${commands}`))
	.catch(console.error);
