/**
 *
 *	Here we create our server using express. It only serves up static files (index.html, bundle.js, our css, and the jquery/bootstrap minified scripts).
 *
**/

const express = require('express');
const path = require('path');

const app = express();

// all requests except for the bootstrap and jquery scrips must redirect to app/
app.use('/', express.static(path.resolve(__dirname, '../')));

// redirects the calls for the boostrap and jquery scrips
app.use('/bootstrap', express.static(path.resolve(__dirname, '../../node_modules/bootstrap/dist/js')));
app.use('/jquery', express.static(path.resolve(__dirname, '../../node_modules/jquery/dist')));

app.get('/', (req, res) => res.render('index.html'));


const port = process.argv[2] ? Number(process.argv[2]) : 5050;


app.listen(port, () => console.log('Server is listening on port ', port));

