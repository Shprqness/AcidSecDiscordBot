const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online...`);
  bot.user.setActivity("Acid Security");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++; // If user isn't bot, add 1 to value.
    });
    return memberCount;
  }

  let icon = bot.user.iconURL;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){
    let kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kickUser) return message.channel.send("Cannot Find Specified User!");
    let kickReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK.USER")) return message.channel.send("You do not have the correct permission 'BAN.BAN'!");
    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kicked Info")
    .setColor("#0da52e")
    .addField("Kicked User", `${kickUser}`)
    .addField("Kicked Users ID", `${kickUser.id}`)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("ID of Kicker", `${message.author.id}`)
    .addField("Reason", `${kickReason}`)
    .setFooter("Coded by Shprqness#8976")

    let kickChannel = message.guild.channels.find(`name`, "logs");
    if(!kickChannel) return message.guild.channel.send("Cannot find channel 'logs', please create one.");
    message.guild.member(kickUser).kick(kickReason);
    kickChannel.send(kickEmbed)

    return;
  }

  if(cmd === `${prefix}info`){
    let botembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#0da52e")
    .setThumbnail(icon)
    .addField("Total Members:", message.guild.memberCount)
    .addField("Created On:", message.guild.createdAt)
    .addField("You Joined:", message.member.joinedAt)
    .setFooter("Coded by Shprqness#8976")

    return message.channel.send(botembed);
  }
});

bot.login(botconfig.token);
