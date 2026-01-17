const https = require('https');

const API_KEY = '1ZCJYBMFJWR87XUC';
const BASE_URL = 'https://www.alphavantage.co/query';

function fetch(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', (err) => reject(err));
    });
}

async function testAPI() {
    console.log('Testing Alpha Vantage API...');
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=IBM&apikey=${API_KEY}`;

    try {
        const json = await fetch(url);
        console.log('API Response Status:', Object.keys(json));

        if (json['Global Quote']) {
            console.log('\n✅ Success: API is working correctly!');
            console.log('Symbol:', json['Global Quote']['01. symbol']);
            console.log('Price:', json['Global Quote']['05. price']);
        } else if (json['Note']) {
            console.log('\n⚠️ Rate Limit: ' + json['Note']);
        } else if (json['Information']) {
            console.log('\nℹ️ Info: ' + json['Information']);
        } else {
            console.log('\n❌ Failed: Unexpected response format.');
            console.log(JSON.stringify(json, null, 2));
        }
    } catch (err) {
        console.error('❌ Error:', err.message);
    }
}

testAPI();
