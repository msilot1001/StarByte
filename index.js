let { User } = require("./User.js")
let db = require('quick.db')
let { Client, Collection, Intents } = require('discord.js');
let fs = require('fs');
let client = new Client({ intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES ] });
client.commands = new Collection();

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

let token = config.token
let dbkey = config.dbkey;

client.commands = new Collection();
let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log(command.data.name);
	client.commands.set(command.data.name, command);
}

console.log()

let mongoose = require("mongoose");

function DBConnect() {
	const connect = mongoose.connect(dbkey, {  
	maxPoolSize: 10, // Maintain up to 10 socket connections
	serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
	family: 4 // Use IPv4, skip trying IPv6
	}).then(() => console.log("==> MongoDB Connected..."))
	.catch(err => console.error(err));
}

DBConnect();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	try {
		//커맨드 여부 확인
		if (!interaction.isCommand()) return;

		//커맨드 불러오기
		const command = client.commands.get(interaction.commandName);

		//커맨드 아니면 리턴
		if (!command) {console.log(`/${interaction.commandName} requested by ${interaction.user.username} is not a valid command.`); return;}

		//디버깅
		console.log(`${interaction.user.username}#${interaction.user.discriminator} Requested Command \"${interaction.commandName}\"`)

		//execute
		await command.execute(client, interaction, User, db, mongoose, DBConnect);
	} catch (error) {
		//에러 출력
		console.error(error);
		//디버깅
		console.log(`Error Occured at \"${interaction.commandName}\" Requested by ${interaction.user.username}#${interaction.user.discriminator} `)
		//쿨다운 초기화
		if(interaction.commandName == 'work') {
			let workcooldown = 60000;
			let lastwork = await db.fetch(`workbefore_${interaction.user.id}`);
			await db.set(`work_${interaction.user.id}`, lastwork)
		}
		return interaction.reply({ content: 'Error occured. Please try after.', ephemeral: true });
	}})

client.login(token);