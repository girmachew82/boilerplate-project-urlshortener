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
const originalUrls = []
const shortUrls = []

app.post('/api/shorturl', (req, res)=>{
 const url  = req.body.url
 const foundIndex = originalUrls.indexOf(url)

 if(!url.includes("http://") && !url.includes("https://")){
  res.json({
    error:'Invalid URL'
  })
 }
 if(foundIndex < 0){
    originalUrls.push(url)
    shortUrls.push(shortUrls.length)

    return res.json({
      original_url: url,
      short_url: shortUrls.length  - 1
    })
 }
 return res.json({
  original_url: url,
  short_url: shortUrls[foundIndex]
})

})
app.post('/api/shorturl/:shorturl', (req, res)=>{
  const url  = parseInt(req.params.shorturl)
  const foundIndex = shortUrls.indexOf(url)

  if(foundIndex < 0){
     return res.json({
       "error":"No Short URL for the given input"
     })
  }else
 res.redirect(originalUrls[foundIndex])
 
 })
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
