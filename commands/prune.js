const { MessageEmbed } = require(`discord.js`)

exports.run = async (client, message, args) => {
	message.delete();
    const amount = parseInt(args[0]);
    if(args[1]){
        var reason = args.slice(1).join(" ")
    }
    else{
        var reason = "No Reason"
    }

	try {
		let pruned = amount;
		if(pruned < 1) return message.channel.send("❌ Cannot Prune Any Messages \n Are the Messages you're trying to prune 14 days Old? If so, No Bots Including Me can Delete These sorry q-q");
		await message.channel.bulkDelete(amount);
		
		message.channel.send(`✅ Deleted ${amount} messages. \n Reason: ${reason}`).then(m => m.delete({timeout: 7400}));
	} catch(err) {
		message.channel.send(`❌ An Error Occured \n \`${err.message}\``);
	}
}


