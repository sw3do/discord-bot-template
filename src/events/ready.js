const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log('\n' + '='.repeat(50));
        console.log('🤖 BOT INFORMATION');
        console.log('='.repeat(50));
        console.log(`📛 Bot Name: ${client.user.tag}`);
        console.log(`🆔 Bot ID: ${client.user.id}`);
        console.log(`🏠 Servers: ${client.guilds.cache.size}`);
        console.log(`👥 Users: ${client.users.cache.size}`);
        console.log(`📝 Slash Commands: ${client.commands.size}`);
        console.log(`⌨️  Prefix Commands: ${client.prefixCommands.size}`);
        console.log(`🔧 Prefix: ${process.env.PREFIX || '!'}`);
        console.log('='.repeat(50));
        console.log('✅ Bot is online and ready!');
        console.log('='.repeat(50) + '\n');
        
        client.user.setPresence({
            activities: [{
                name: `${process.env.PREFIX || '!'}help | /help`,
                type: ActivityType.Listening
            }],
            status: 'online'
        });
    },
};