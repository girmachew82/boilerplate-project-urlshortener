require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({extended:false}))
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
// URL shortener
app.post('api/shorturl', (req, res)=>{
  res.json(req.body)

})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
