module.exports = (client) => {
  console.log(`Bot Successfully Initallized`);
    client.user.setPresence({
        activity: {
            name: "My Prefix: >",
            type: "LISTENING"
        }
    })
}
