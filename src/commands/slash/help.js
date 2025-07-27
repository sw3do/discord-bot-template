const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows all available commands and bot information'),
    
    async execute(interaction) {
        const { client } = interaction;
        const prefix = process.env.PREFIX || '!';
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🤖 Bot Help & Commands')
            .setDescription(`Hello! I'm a Discord bot with both slash and prefix command support.`)
            .addFields(
                {
                    name: '⚡ Slash Commands',
                    value: client.commands.map(cmd => `\`/${cmd.data.name}\` - ${cmd.data.description}`).join('\n') || 'No slash commands available',
                    inline: false
                },
                {
                    name: '💬 Prefix Commands',
                    value: client.prefixCommands.map(cmd => {
                        const aliases = cmd.aliases ? ` (${cmd.aliases.map(a => `${prefix}${a}`).join(', ')})` : '';
                        return `\`${prefix}${cmd.name}\`${aliases} - ${cmd.description}`;
                    }).join('\n') || 'No prefix commands available',
                    inline: false
                },
                {
                    name: '📊 Bot Statistics',
                    value: `🏠 Servers: ${client.guilds.cache.size}\n👥 Users: ${client.users.cache.size}\n🏓 Ping: ${client.ws.ping}ms`,
                    inline: true
                },
                {
                    name: '⚙️ Bot Information',
                    value: `🔧 Prefix: \`${prefix}\`\n📝 Commands: ${client.commands.size + client.prefixCommands.size}\n🚀 Discord.js v${require('discord.js').version}`,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ 
                text: `Requested by ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL() 
            });
        
        if (client.user.displayAvatarURL()) {
            embed.setThumbnail(client.user.displayAvatarURL());
        }
        
        await interaction.reply({ embeds: [embed] });
    },
};