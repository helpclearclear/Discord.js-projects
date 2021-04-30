require('dotenv').config();
const Commando = require('discord.js-commando')
const path = require('path')
let key = '!'
const client = new Commando.CommandoClient({
    owner:'632399479642914849',
    CommandPrefix:key,
})


client.on('ready', ready);

function ready(){
    console.log(`we are running as ${client.user.tag}`)
    client.registry
    .registerGroups([
        ['cmds', 'cmds commands']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'COMMANDS'))
}

client.login(process.env.token);