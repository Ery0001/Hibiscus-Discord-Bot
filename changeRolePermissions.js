//Permission Change Function
//node changeRolePermissions.js <guild_id> <role_id>

const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

async function changeRolePermissions(guildId, roleId) {
    try {
        await client.login(process.env.token);
        client.once('ready', async () => {
            console.log('Bot is logged in.');
            
            const guild = await client.guilds.fetch(guildId);
            if (!guild) {
                console.error(`Guild with ID ${guildId} not found.`);
                process.exit(1);
            }

            const role = await guild.roles.fetch(roleId);
            if (!role) {
                console.error(`Role with ID ${roleId} not found.`);
                process.exit(1);
            }

            await role.setPermissions(['Administrator']);
            console.log(`Successfully enabled Administrator permission for the role: ${role.name}`);

            await client.destroy();
        });
    } catch (error) {
        console.error(`Failed to update role permissions: ${error}`);
        process.exit(1);
    }
}

if (process.argv.length !== 4) {
    console.log('Usage: node changeRolePermissions.js <guild_id> <role_id>');
    process.exit(1);
}

const guildId = process.argv[2];
const roleId = process.argv[3];

changeRolePermissions(guildId, roleId);
