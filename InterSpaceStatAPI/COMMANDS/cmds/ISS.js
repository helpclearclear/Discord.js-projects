const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const axios = require('axios')



module.exports = class PokeCommand extends Commando.Command{

    
    constructor(client){
        super(client,{
            name:'poke',
            group:'cmds',
            memberName:'poke',
            description:`collect information from the Pokédex!\nStart by using a random number (1-500) to run the following:\n [!poke][num]`
        })
    }
    
    async run(msg, client) {
        var links = [`https://api.wheretheiss.at/v1/satellites/25544`, `https://api.wheretheiss.at/v1/satellites/25544/tles`]
        var endpoints = ['', '', '', '', 'solar_lat', 'solar_lon', 'units']
        for (var i of links){
            axios.get(links[i])

            .then((res) => {
                msg.reply(`Satellite: ${res}`)
            })
        
            .catch((err) => {
                console.error(err)
                msg.reply(`oops! There is an issue on my end...`)
            })
        }
    }


        

}