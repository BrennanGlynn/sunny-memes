let config = {};

config.facebook = {
  clientID: '316389025537007',
  clientSecret: '78bcf0c5451347fb5b637d1b2299fa0e',
  callbackUrl: process.env.NODE_ENV === 'production' ? 'https://sunny-memes.appspot.com/auth/facebook/return' : 'http://localhost:3001/auth/facebook/return'
};
config.gmail = {};

config.mongoUri = 'mongodb://BrennanGlynn:o570tMuCzjttCMMI@cluster0-shard-00-00-g6c7z.mongodb.net:27017,cluster0-shard-00-01-g6c7z.mongodb.net:27017,cluster0-shard-00-02-g6c7z.mongodb.net:27017/sunny?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'

module.exports = config