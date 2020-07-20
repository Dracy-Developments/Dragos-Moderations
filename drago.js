// NOTE: do NOT start this directly! Instead, use npm start (grunt cluster runs first).

console.log(`Discord ShardingManager: Starting up the bot in shard mode`);

// load shard manager
const { ShardingManager } = require('discord.js');

// Get options
const defaultOptions = require(`./config/custom`);
const overrideOptions = require(`./config/local`);

// merge options
const token = overrideOptions.custom.discord.token || defaultOptions.custom.discord.token;
const startPort = overrideOptions.custom.discord.startPort || defaultOptions.custom.discord.startPort;
const startShard = overrideOptions.custom.discord.startShard || defaultOptions.custom.discord.startShard;
const shards = overrideOptions.custom.discord.shards || defaultOptions.custom.discord.shards;

// launch shard manager
const manager = new ShardingManager('./app.js', { token: token, totalShards: shards });

// Spawn processes
new Promise(async (resolve) => {
    for (var i = 0; i < shards; i++) {
        console.log(`Discord ShardingManager: Spawning shard ${startShard + i} on port ${startPort + i}`);
        var shard = manager.createShard(startShard + i);
        shard.args = [`--port=${startPort + i}`, `--prod`];
        await shard.spawn();
        shard.on('death', (proc) => console.warn(`Discord ShardingManager: A shard is down!`))
    }
    resolve();
});
manager.on('shardCreate', shard => console.log(`Discord ShardingManager: Shard ${shard.id} was created.`));