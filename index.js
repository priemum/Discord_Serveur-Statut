const Discord = require('discord.js')
require('dotenv').config()

const Client = new Discord.Client();

let net = require('net');
let hosts = [[process.env.serverip, process.env.serverport]];

Client.on('ready', async () => {
	console.log("LE BOT EST EN LIGNE !!")

	const msg = Client.channels.cache.get(process.env.channelid).send({
		embed: {
			color: 3553599,
			description: `\`\`\`js\n⌛ Récupération des informations du serveur...\`\`\``
		}
	}).then((msg)=> {

		function intervalFunc() {

			hosts.forEach(function (item) {

				let sock = new net.Socket();
				sock.setTimeout(2500);

				// SERVEUR ONLINE
				sock.on('connect', function () {
					msg.edit({
						embed: {
							color: 0x57F287,
							description: `\`\`\`js\n✅ Serveur En ligne\`\`\``
						}
					})

					sock.destroy();

					// SERVEUR OFFLINE
				}).on('error', function (e) {
					msg.edit({
						embed: {
							color: 0xED4245,
							description: `\`\`\`js\n❌ Serveur Hors ligne\`\`\``
						}
					})

					// SERVER TIMEOUT
				}).on('timeout', function (e) {
					msg.edit({
						embed: {
							color: 0xED4245,
							description: `\`\`\`js\n❌ Hors ligne\`\`\``
						}
					})
				}).connect(item[1], item[0]);
			});
		}

		setInterval(intervalFunc, 5500);

	})
})

Client.login(process.env.token);
