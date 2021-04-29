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
        if (msg.content.split(" ").length <= 2 && Number(msg.content.split(" ")[1]) != "NaN"){
            var a=1
        }else{msg.reply({
            error: `${msg.content} is an invalid input!`
        })}

        var id = msg.content.split(" ")[1]

        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then((res) => {
                var name = res.data.name
                var weight = res.data.weight
                var height = res.data.height
                var speciesLink = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
                var a = [name, id, weight, height, speciesLink]
                console.log("A: ",a)
                axios.get(speciesLink)
                .then((res) => {
                   var eggs = res.data.egg_groups;
                   var eggGroups = ""
                   for (var item of eggs){
                       eggGroups+="["+item.name+"] "
                    }
                   var color = res.data.color.name;
                   var shape = res.data.shape.name;
                   var evolutionChainLink = res.data.evolution_chain.url
                   var generation = res.data.generation.name
                   var hab = res.data.habitat //make sure to make if statement for null value
                   if (hab == null) {hab = `Uknown`; hab={name : `Uknown`}} else {hab = res.data.habitat}
                   var evolvesFrom = res.data.evolves_from_species //make sure to make if statement for null value
                   if (evolvesFrom == null) {evolvesFrom = name; evolvesFrom={'name' : evolvesFrom}} else {evolvesFrom = res.data.evolves_from_species.name}
                   var b = [eggGroups, color, shape, generation, hab.name, evolvesFrom.name, evolutionChainLink] 
                   console.log("B: ",b)
                   axios.get(evolutionChainLink) 
                   .then((res) => {
                       var speciesName = res.data.chain.species.name;
                       var evolvesTo = res.data.chain.evolves_to[0].species.name;
                       var evoTrack = [evolvesFrom, evolvesTo];
                       var c = [evoTrack];
                       console.log("C: ",c)
                       msg.reply(`\n\`Basic Stats:\` \n\n\`\`\` -Name: ${name}\n -ID: ${id}\n -Weight: ${weight}lbs\n -Height: ${height}ft\`\`\`\n\n\`Species:\`\n\n\`\`\` -Egg Groups: ${eggGroups}\n -Color: ${color}\n -Shape: ${shape}\n -Generation: ${generation}\n -Habitat: ${hab.name}\`\`\`\n\n\`Evolution:\`\n\` -EvoChain: [${evolvesFrom.name} --> ${evolvesTo}]\`\n\n\n`)
                   })
                   .catch((err) => {
                       console.log(err)
                       msg.reply(`oops! There is an issue on my end...`)
                   })
                })
                .catch((err) => {
                    console.log(err)
                    msg.reply(`oops! There is an issue on my end...`)
                })
            })
            .catch((err) => {
                console.error(err)
                msg.reply(`oops! There is an issue on my end...`)
            })
    }

}
