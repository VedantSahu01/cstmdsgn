//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const app = express();
var mongoose = require('mongoose');
const bodyParser = require("body-parser");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
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
const initials = [{ name: 'DB Shirt', price: 100 ,quantity:1, tags:['shirt','men'], image: 'https://m.media-amazon.com/images/I/81ep28K+XYL._AC_UL480_FMwebp_QL65_.jpg'}, { name: 'B Shirt', price:200, quantity:1, image: 'https://m.media-amazon.com/images/I/81-5lUQGhjL._AC_UL480_FMwebp_QL65_.jpg', tags:['shirt','men']}];
// Cart.deleteMany({}, function(err, docs) {
//   if(err)
//     console.log('Error on deleting initials');
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
app.post('/cart', (req, res) => {
  Cart.insertMany([{
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    quantity:req.body.quantity,
  }], function(err,cart){
    if(!err)
      res.redirect('/cart');
    else
      console.log("Error");
  });

});

app.get('/product/:name', function(req, res) {
  Product.findOne({'_id':req.params.name},function(err,product){
    if(!err)
      res.render(__dirname + '/product.ejs', {product:product})
    else
      console.log("Error");
  });
});








//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
