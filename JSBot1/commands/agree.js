const { User } = require('../models/User.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const agree = interaction => {

    User.findOne(
        { id: message.author.id},
        (err, user) => {
            if (!user) {
                console.log("no user to update!")
            } else {
                updateVariables = {
                    
            }
            User.findOneAndUpdate(
                { id: message.author.id},
                updateVariables,
                (err, doc) => {
                    if (err)
                        console.error(
                            `Failed to update user message time ${interaction.user.username}!`, err)
                }
            )
            }
        }
    )
}

module.exports = {
	data: new SlashCommandBuilder()
    .setName('agree')
    .setDescription('Agree the bot’s terms and conditions'),
	async execute(client, interaction) {
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

		await interaction.reply();
	},
};