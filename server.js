const express = require('express')
const fetch = require('node-fetch')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/readwallets',  async (req, res) => {
  const params = new URLSearchParams({ userId: "some-user-identifer" });
  const response = await fetch(
    `https://www.crossmint.io/api/v1-alpha1/wallets?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'X-PROJECT-ID': '0bf62050-bbbf-422a-9dae-a6fa6f29582e',
        'X-CLIENT-SECRET': 'sk_test.IPcgovAy.zqQXMeOD2845uBOwwsnvAOwIJsLdtfDs	'
      }
    }
  );

  const wallets = await response.json();
})

app.get('/readcontent', async (req, res) => {
const locator = `sol:A9vzqFSxKVasf55GdZCAFKhKW9zckzx6ekhhsQTretTa`;
console.log('readcontent')
try{
const response = await fetch(
  `https://www.crossmint.io/api/v1-alpha1/wallets/${locator}/nfts`,
  {
    method: 'GET',
    headers: {
      'X-PROJECT-ID': '0bf62050-bbbf-422a-9dae-a6fa6f29582e',
      'X-CLIENT-SECRET': 'sk_test.IPcgovAy.zqQXMeOD2845uBOwwsnvAOwIJsLdtfDs'
    }
  }
);

const data = await response.json();
console.log('data', data)
res.json(data)
const contractAddress = data.address;
} catch(error){
  console.log('READCONTENT', error);
}
})

app.post('/createwallet', async (req, res) => {
  console.log('createwallet', req.body)
  const userId = req.body.userId
  const body = {

    userId: userId,
    chain: "solana",
  }
try{  
  const response = await fetch(
    'https://staging.crossmint.io/api/v1-alpha1/collections/wallets',
    {
      method: 'POST',
      headers: {
        'X-PROJECT-ID': '0bf62050-bbbf-422a-9dae-a6fa6f29582e',
        'X-CLIENT-SECRET': 'sk_test.IPcgovAy.zqQXMeOD2845uBOwwsnvAOwIJsLdtfDs	'
      },
      body: JSON.stringify(body),
    }
  );
  
  const wallets = await response.text();
  console.log('wallet response',wallets)
  res.json(wallets)
} catch(error) {
  console.log('error', error)
  res.status(500).json(error)
}
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


