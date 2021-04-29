//WORK IN PROGRESS: trying to make the `!poke` command recursive and more efficient.


const Commando = require('discord.js-commando')
const Discord = require('discord.js')
const axios = require('axios')


var list = [];
module.exports = class PokeCommand extends Commando.Command{

    
    constructor(client){
        super(client,{
            name:'poke2',
            group:'cmds',
            memberName:'poke2',
            description:`collect information from the Pokédex!\nStart by using a random number (1-500) to run the following:\n [!poke][num]`
        })
    }
    
    async run(msg, client){
        var id = msg.content.split(" ")[1]
        var links = [`https://pokeapi.co/api/v2/pokemon/${id}/`, `https://pokeapi.co/api/v2/pokemon-species/${id}/`];
        var endpoints = [["name", "weight", "height"], ["egg_groups", "color.name", "shape.name", "generation.name", "habitat"]];

        
        //have system for endpoints that are objects
        //have system for endpoints that are null

        for (var i=0; i<endpoints.length; i++) {
            console.log("I: "+i)
            console.log(links[i])
            console.log(endpoints[i])
            for (var item of endpoints[i]){
                axios.get(links[i])
                .then((res) => {
                    console.log(item)
                    if (item.split(".").length == 1){var Item = res.data[item];list.push(Item);console.log(1)}
                    if (item.split(".").length == 2){var Item = res.data[item.split(".")[0]].name;list.push(Item);console.log(2)}
                    //if (item.split(".").length == 4){var Item = res.data.chain[item.split(".")[1]][0].species.name;list.push(Item);console.log(res.data.chain[item.split(".")[1]][0])}
                })
                .catch((err) => {
                    console.log(err)
                    msg.reply(`oops! There is an issue on my end...`)
                })
            }
            console.log(list)
            
        }for (item of list){console.log(item)}
    }

}
