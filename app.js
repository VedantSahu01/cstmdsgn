//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const app = express();
var mongoose = require('mongoose');

app.use(express.static('public'))
mongoose.connect('mongodb://127.0.0.1:27017/ecom', {useNewUrlParser: true})
var db = mongoose.connection;
var cartSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  quantity: Number,
});
var productSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  desc: String,
  tags: [],
});
var Cart = mongoose.model('Cart', cartSchema);
var Product = mongoose.model('Product', productSchema );
const initials = [{ name: '1st Product', price: 100 ,quantity:1}, { name: '2nd Product', price:200, quantity:1 }];
// Cart.insertMany(initials, function(err, docs) {
//   if(err)
//     console.log('Error on inserting initials');
// });
app.get('/', (req, res) => {
  Product.find({}, function(err,products){
    if(!err)
      res.render(__dirname + '/home.ejs', {products:products})
    else
      console.log("Error");
  });
});

app.get('/cart', (req, res) => {
  Cart.find({}, function(err,cart){
    if(!err)
      res.render(__dirname + '/cart.ejs', {cart:cart})
    else
      console.log("Error");
  });
});









//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
