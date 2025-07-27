const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Replies with Pong and shows bot latency!',
    aliases: ['pong', 'latency'],
    usage: 'ping',
    
    async execute(message, args) {
        const sent = await message.reply('Pinging...');
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🏓 Pong!')
            .addFields(
                {
                    name: '📡 Websocket Heartbeat',
                    value: `${message.client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: '🔄 Roundtrip Latency',
                    value: `${sent.createdTimestamp - message.createdTimestamp}ms`,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: `Requested by ${message.author.tag}`, 
                iconURL: message.author.displayAvatarURL() 
            });
        
        await sent.edit({ 
            content: '', 
            embeds: [embed] 
        });
    },
};