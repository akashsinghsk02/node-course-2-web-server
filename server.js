console.log('server.js')
const express = require('express');

const fs = require('fs'); 

const hbs = require('hbs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');




app.use((req, res, next) => {
   var log = new Date().toString();
   console.log(`${log}: ${req.method} ${req.url}  `);
   fs.appendFile('server.log',log+'\n',(err)=>{
      if(err)
      console.log('unable to add data to file Error message ='+err);
   });  
   next(); 
})

// app.use( (req,res,next)=>{
//    res.render('maintaince.hbs');
// } )

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase();
});


app.get('/', (req, res) => {

   res.render('welcome.hbs', {
      pageInformation: 'This is about page dynamic renderding 5.31pm (welcome) ',
      paragraph: 'This is hbs dynamic rendering paragraph'
   });

});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
      pageInformation: 'This is about page dynamic renderding (about)',
   });
})

app.get('/bad', (req, res) => {
   res.send({
      error_message: "Unable to connet to network"
   });
})

app.listen(3000, () => {
   console.log('Server started')
});