const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();


let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

const token = config.token
const prefix = config.prefix

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	console.log(command);
	client.commands.set(command.name, command);
}

const MONGO_URI = config.dbkey

const mongoose = require( 'mongoose' )


//  에러방지 옵션설정

const { User } = require("./models/User")
mongoose.connect(MONGO_URI,  {
	} ) .then(() => console.log( "MongoDB Connected success !!" ))
	.catch(err => console.log( err.stack ))


client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const user_id = interaction.id

	await User.find({ 'id': user_id}, function(err, user) {
		console.log(user.id)
		if (!user) {
			const newUser = new User({
			id: interaction.user.id,
			username: interaction.user.username,
			bank: 0,
			wallet: 0,
			bitcoins: 0,
			agreed: 0
			});
			newUser.save((err, doc) => {
				if (err) console.log(`Failed to save user ${interaction.user.username}!`, err)
				console.log(`New User Saved : ID ${interaction.user.id} Username ${interaction.user.username}`);
			});
		}

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	});
});

client.login(token)