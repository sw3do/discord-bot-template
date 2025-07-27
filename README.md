# Discord Bot Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.9.0-brightgreen)](https://nodejs.org/)
[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue)](https://discord.js.org/)
[![GitHub issues](https://img.shields.io/github/issues/sw3do/discord-bot-template)](https://github.com/sw3do/discord-bot-template/issues)
[![GitHub stars](https://img.shields.io/github/stars/sw3do/discord-bot-template)](https://github.com/sw3do/discord-bot-template/stargazers)

A professional Discord.js v14 bot template with support for both prefix and slash commands.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Getting Discord Credentials](#getting-discord-credentials)
  - [Bot Permissions](#bot-permissions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Adding Commands](#adding-commands)
- [Available Commands](#available-commands)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

- ✅ Discord.js v14 support
- ✅ Slash commands with automatic synchronization
- ✅ Prefix commands with aliases support
- ✅ Event handling system
- ✅ Error handling and logging
- ✅ Environment configuration
- ✅ Professional code structure
- ✅ Ready-to-use ping command (both prefix and slash)

## Setup

### Prerequisites

- Node.js 16.9.0 or higher
- A Discord application and bot token

### Installation

1. Clone this repository:
```bash
git clone https://github.com/sw3do/discord-bot-template.git
cd discord-bot-template
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
PREFIX=!
DEBUG=true
```

### Getting Discord Credentials

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the bot token to your `.env` file
5. Copy the application ID (CLIENT_ID) from the "General Information" section

### Bot Permissions

Your bot needs the following permissions:
- Send Messages
- Use Slash Commands
- Read Message History
- Embed Links

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Project Structure

```
src/
├── commands/
│   ├── prefix/          # Prefix commands
│   │   └── ping.js
│   └── slash/           # Slash commands
│       └── ping.js
├── events/              # Event handlers
│   ├── ready.js
│   └── error.js
├── utils/               # Utility functions
│   └── syncCommands.js
└── index.js             # Main bot file
```

## Adding Commands

### Slash Commands

Create a new file in `src/commands/slash/`:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commandname')
        .setDescription('Command description'),
    
    async execute(interaction) {
        await interaction.reply('Hello!');
    },
};
```

### Prefix Commands

Create a new file in `src/commands/prefix/`:

```javascript
module.exports = {
    name: 'commandname',
    description: 'Command description',
    aliases: ['alias1', 'alias2'],
    usage: 'commandname [arguments]',
    
    async execute(message, args) {
        await message.reply('Hello!');
    },
};
```

### Events

Create a new file in `src/events/`:

```javascript
const { Events } = require('discord.js');

module.exports = {
    name: Events.EventName,
    once: false, // Set to true for one-time events
    execute(/* event parameters */) {
        // Event logic here
    },
};
```

## Available Commands

### Ping Command
- **Slash**: `/ping`
- **Prefix**: `!ping`, `!pong`, `!latency`
- **Description**: Shows bot latency and websocket heartbeat

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DISCORD_TOKEN | Your bot token | Yes |
| CLIENT_ID | Your application ID | Yes |
| PREFIX | Command prefix for prefix commands | No (default: !) |
| DEBUG | Enable debug logging | No (default: false) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you need help or have questions, please open an issue on GitHub.