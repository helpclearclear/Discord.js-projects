const Commando = require('discord.js-commando');

module.exports= class AddCommand extends Commando.Command {
    constructor(client){
        super(client, {
            name:'add',
            group:'misc',
            memberName:'add',
            description:''
        })
    }

    async run(msg) {
        msg.reply(`Under Construction...`)
    }
}