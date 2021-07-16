const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("Ready!");
});

const statusMessages = {
	Waiting: {
		text: "📊 Waiting for community feedback, please vote!",
		color: 0xffea00,
	},
	Accepted: {
		text: "✅ Accepted idea! Expect this soon.",
		color: 0x34eb5b,
	},
	Denied: {
		text: "❌ Thank you for the feedback, but we are not interested in this idea at this time.",
		color: 0xc20808,
	},
};

client.on("message", (message) => {
	const { channel, member, content } = message;
	if (channel.id === "863731908096819250" && !member.user.bot) {
		message.delete();
		const embed = new Discord.MessageEmbed()
			.setColor(statusMessages.Waiting.color)
			.setAuthor(
				member.displayName,
				member.user.displayAvatarURL({ dynamic: false })
			)
			.setDescription(content)
			.setFooter(statusMessages.Waiting.text);

		channel.send(embed).then((message) => {
			message.react("👍").then(() => {
				message.react("👎");
			});
		});
	}
});

client.on("messageReactionAdd", (reaction, user) => {
	const { member } = reaction.message;
	if (
		reaction.message.channel.id === "863731908096819250" &&
		user.id === "635080966829899805" &&
		reaction.emoji.name === "👍"
	) {
		const RecEmbed = reaction.message.embeds[0];
		const embed = new Discord.MessageEmbed(RecEmbed)
			.setColor(statusMessages.Accepted.color)
			.setFooter(statusMessages.Accepted.text);
		reaction.message.edit(embed);
	}
});

client.on("messageReactionAdd", (reaction, user) => {
	const { member } = reaction.message;
	if (
		reaction.message.channel.id === "863836073696034887" &&
		user.id === "635080966829899805" &&
		reaction.emoji.name === "👎"
	) {
		const RecEmbed = reaction.message.embeds[0];
		const embed = new Discord.MessageEmbed(RecEmbed)
			.setColor(statusMessages.Denied.color)
			.setFooter(statusMessages.Denied.text);
		reaction.message.edit(embed);
	}
});

client.login(process.env.TOKEN);
