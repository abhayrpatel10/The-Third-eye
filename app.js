const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: 'e99d0ebb',
  apiSecret: 'SCEmJzV4we0tHi9J',
});

const from = 'Nexmo';
const to = '919952121766';
const text = 'Hello from Nexmo';

nexmo.message.sendSms(from, to, text);