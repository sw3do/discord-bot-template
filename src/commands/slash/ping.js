const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong and shows bot latency!'),
    
    async execute(interaction) {
        await interaction.reply('Pinging...');
        const sent = await interaction.fetchReply();
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🏓 Pong!')
            .addFields(
                {
                    name: '📡 Websocket Heartbeat',
                    value: `${interaction.client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: '🔄 Roundtrip Latency',
                    value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: `Requested by ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL() 
            });
        
        await interaction.editReply({ 
            content: '', 
            embeds: [embed] 
        });
    },
};