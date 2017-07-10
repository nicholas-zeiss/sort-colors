/**
Here we create our server using express. It only serves up static files (index.html, bundle.js, our css, and the jquery/bootstrap minified scripts) and is quite simple.
**/

const express = require('express');
const path = require('path');

const app = express();

//all requests except for the bootstrap and jquery scrips must redirect to app/
app.use('/', express.static(path.resolve(__dirname, '../')));

//redirects the calls for the boostrap and jquery scrips
app.use('/bootstrap', express.static(path.resolve(__dirname, '../../node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.resolve(__dirname, '../../node_modules/jquery/dist')));

//renders index.html
app.get('/', (req, res) => {
	res.render('index.html');
});

app.listen(process.env.PORT || 5050, () => {
	console.log('Server is listening on port ' + process.env.PORT || '5050');
});