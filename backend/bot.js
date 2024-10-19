const Discord = require('discord.js');
const axios = require('axios');
let client;

async function startBot() {
    // Buscar as configurações do backend
    const response = await axios.get('http://localhost:5000/api/config');
    const { discordToken, overseerrApiUrl, overseerrApiKey } = response.data;

    client = new Discord.Client();

    client.once('ready', () => {
        console.log('Bot está online!');
    });

    client.on('message', async message => {
        if (message.content.startsWith('!request')) {
            const movieTitle = message.content.replace('!request', '').trim();
            
            try {
                const overseerrResponse = await axios.post(`${overseerrApiUrl}/request`, {
                    title: movieTitle,
                    apiKey: overseerrApiKey
                });
                
                if (overseerrResponse.data.success) {
                    message.channel.send(`O filme "${movieTitle}" foi requisitado com sucesso!`);
                } else {
                    message.channel.send(`Houve um erro ao requisitar o filme "${movieTitle}".`);
                }
            } catch (err) {
                message.channel.send(`Erro ao requisitar o filme "${movieTitle}".`);
            }
        }
    });

    client.login(discordToken);
}

startBot();
