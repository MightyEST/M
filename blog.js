const express = require('express');
const ejs = require('ejs');
const body_parser = require('body-parser');
const method_override = require('method-override');


let main_router = require('./routes/main');
let article_router = require('./routes/article');
//loome express rakenduse objekti 
let app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));
app.use(method_override('_method'));

//lisame route failid (määravad veebirakenduse alamlehed)
app.use('/', main_router);
app.use('/article', article_router);

//lisame CSS ja JS ja img linkide jaoks "staatilise asukoha"
app.use(express.static('public'));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

//käivitame serveri programmi - paneme ta kuulama päringuid kindalt aadressilt ja pordilt
app.listen(3000,'127.0.0.1',()=>{
    console.log('Server is running at localhost:3000'   );
});


