require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');
const syncCommands = require('./utils/syncCommands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();
client.prefixCommands = new Collection();

const loadCommands = () => {
    const slashCommandsPath = path.join(__dirname, 'commands', 'slash');
    const prefixCommandsPath = path.join(__dirname, 'commands', 'prefix');
    
    if (fs.existsSync(slashCommandsPath)) {
        const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of slashCommandFiles) {
            const filePath = path.join(slashCommandsPath, file);
            const command = require(filePath);
            
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log(`✅ Loaded slash command: ${command.data.name}`);
            } else {
                console.log(`⚠️  Warning: Slash command at ${filePath} is missing required "data" or "execute" property.`);
            }
        }
    }
    
    if (fs.existsSync(prefixCommandsPath)) {
        const prefixCommandFiles = fs.readdirSync(prefixCommandsPath).filter(file => file.endsWith('.js'));
        
        for (const file of prefixCommandFiles) {
            const filePath = path.join(prefixCommandsPath, file);
            const command = require(filePath);
            
            if ('name' in command && 'execute' in command) {
                client.prefixCommands.set(command.name, command);
                console.log(`✅ Loaded prefix command: ${command.name}`);
            } else {
                console.log(`⚠️  Warning: Prefix command at ${filePath} is missing required "name" or "execute" property.`);
            }
        }
    }
};

const loadEvents = () => {
    const eventsPath = path.join(__dirname, 'events');
    
    if (fs.existsSync(eventsPath)) {
        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        
        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            const event = require(filePath);
            
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args));
            } else {
                client.on(event.name, (...args) => event.execute(...args));
            }
            
            console.log(`✅ Loaded event: ${event.name}`);
        }
    }
};

client.once(Events.ClientReady, async (readyClient) => {
    console.log(`🚀 Bot is ready! Logged in as ${readyClient.user.tag}`);
    
    try {
        const commands = Array.from(client.commands.values()).map(command => command.data.toJSON());
        
        if (commands.length > 0) {
            const result = await syncCommands(client, commands, {
                debug: process.env.DEBUG === 'true'
            });
            
            console.log(`📝 Command sync completed:`);
            console.log(`   • Created: ${result.newCommandCount}`);
            console.log(`   • Updated: ${result.updatedCommandCount}`);
            console.log(`   • Deleted: ${result.deletedCommandCount}`);
        }
    } catch (error) {
        console.error('❌ Error syncing commands:', error);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    
    if (!command) {
        console.error(`❌ No command matching ${interaction.commandName} was found.`);
        return;
    }
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`❌ Error executing command ${interaction.commandName}:`, error);
        
        const errorMessage = {
            content: 'There was an error while executing this command!',
            ephemeral: true
        };
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    
    const prefix = process.env.PREFIX || '!';
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.prefixCommands.get(commandName) || 
                   client.prefixCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;
    
    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(`❌ Error executing prefix command ${commandName}:`, error);
        await message.reply('There was an error while executing this command!');
    }
});

process.on('unhandledRejection', error => {
    console.error('❌ Unhandled promise rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Uncaught exception:', error);
    process.exit(1);
});

loadCommands();
loadEvents();

client.login(process.env.DISCORD_TOKEN);

module.exports = client;