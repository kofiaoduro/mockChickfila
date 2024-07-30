const Category = require('./models/category');
const Product = require('./models/product')
const passport = require('passport')
const fetchCategoryLinks = async (req, res, next) => {
    try {
        const categoryLinks = await Category.find({});
        res.locals.categoryLinks = categoryLinks;
        next();
    } catch (error) {
        next(error);
    }
};

const addShoppingCartToLocals = (req, res, next) => {
    res.locals.shoppingCart = req.session.shoppingCart || [];
    res.locals.individualItem = req.session.Item
    next();
};




const loopThroughCartSession = async (req, res, next) => {
    const cartItems = []; 
    if (req.session.shoppingCart) {
        try {
            for (let i = 0; i < req.session.shoppingCart.length; i++) {
                const cartItem = await Product.findById(req.session.shoppingCart[i].id);
                if (cartItem) {
                    cartItem.qty = parseInt(req.session.shoppingCart[i].qty, 10);
                    console.log('OURRRR iTEMMMMMMM', cartItem);
                    cartItems.push(cartItem);
                    console.log(cartItems, 'Cart Itemmsssss');
                }
            }
            res.locals.cartItems = cartItems;
        } catch (error) {
            console.error('Error fetching cart items:', error);
            res.locals.cartItems = [];
        }
    } else {
        res.locals.cartItems = [];
    }
    next();
};

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        console.log(req.session.returnTo, "You will return To")
        return res.redirect('/login');
    }
    next();
};


module.exports = {
    fetchCategoryLinks,
    addShoppingCartToLocals,
    loopThroughCartSession,
    isLoggedIn
};