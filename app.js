const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./Controllers/error');
const sequelize = require('./util/database');
const app = express();
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
// .then((result)=>{
//     console.log(result); 
// })
// .catch((err)=> {
//     console.log(err);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findById(1).then(user => {
        req.user = user;
        next();
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints : true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through : CartItem});

sequelize
.sync()
.then(result =>{
    return User.findById(1)
    // console.log(result);
}).then(user=>{
    if(!user){
        return User.create({name : 'Max', email : "test@test.com"});
    }
    return user;
})
.then(user=>{
    return user.createCart();
})
.then(cart=>{
    app.listen(3000); 
})
.catch(err=> console.log(err));


