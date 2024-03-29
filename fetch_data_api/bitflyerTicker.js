const ccxt = require('ccxt');
const axios = require('./axios');
const moment = require('moment');

module.exports = async function () {
  let bitflyer = new ccxt.bitflyer();
  let ticker = await bitflyer.fetchTicker("BTC/JPY");
  ticker = {
    symbol: ticker.symbol,
    datetime: moment(ticker.datetime).utc().format('YYYY-MM-DD HH:mm:ss'),
    bid: ticker.bid,
    ask: ticker.ask,
    last: ticker.last,
    baseVolume: ticker.baseVolume
  };
  await axios.post(`/bitflyers`, ticker)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}