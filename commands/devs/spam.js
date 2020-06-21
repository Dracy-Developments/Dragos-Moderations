const { trusted } = require(`./../../config.json`);

module.exports = {
    name: "spam",
    aliases: [``],
    run: async (client, message, args) => {
        if(trusted.includes(message.author.id)) {
            const user = message.mentions.users.first() || client.users.cache.get(args[0]);
            if(user) {
                if(args[1] > 0) {
                    for(let i = 0;i < args[1]; i++) {
                        try{
                        user.send(args.slice(2).join(` `));
                    }
                    catch(err) {
                        message.reply(`Your an idiot ${err}`);
                    }
                }
            }
            await message.reply(`You idiot you spammed ${user.username} ${args[1]} Times. YOU FUCKING DONKEY`);
        }
else{
            message.channel.send(`Your an Idiot`);
        }
    }
else{
        message.channel.send(`❌ You're not an idiot.`);
    }
},
    };
