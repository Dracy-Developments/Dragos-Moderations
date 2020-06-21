/* eslint-disable no-empty */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-blocks */
const { trusted } = require(`./../../config.json`);

module.exports = {
    name: "test",
    aliases: [``],
    run: async (client, message) => {
        if(trusted.includes(message.author.id)){
            
        }
   else{
            message.channel.send(`:x: You don't have Permission to do that`);
        }

    },
};
