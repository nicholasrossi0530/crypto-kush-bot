require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const { ApolloClient, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
  uri: 'https://api.opensea.io/graphql/',
  cache: new InMemoryCache()
});

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => {
    console.log(result);
    msg.reply('ding');
    msg.reply('result');
    msg.channel.send('pong');
  });

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user dummy!');
    }
  }
});
