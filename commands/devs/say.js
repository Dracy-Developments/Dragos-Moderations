const { trusted } = require(`./../../config.json`);

module.exports = {
    name: "say",
    aliases: [``],
    run: async (client, message, args) => {
        if(trusted.includes(message.author.id)) {

        if(args[0]) {
            message.delete();
            message.channel.send(args.slice(0).join(" "));
        }
        else{
            message.delete();
            message.channel.send(`Say Something At least SMH`).then(msg => msg.delete({ timeout: 5000 }));
        }
    }
else{
        message.channel.send(`❌ You don't have Permission to do this.`);
    }
},
};