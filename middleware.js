const Category = require('./models/category');
const Product = require('./models/product')
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





const loopThroughCartSession = async (req, res, next)=>{
    const cartItems = []; 
    if(req.session.shoppingCart){
        for(let i = 0; i < req.session.shoppingCart.length; i++){
            const cartItem = await Product.findById(req.session.shoppingCart[i].id)
            console.log('OURRRR iTEMMMMMMM', cartItem)
            cartItems.push(cartItem)
            console.log(cartItems, 'Cart Itemmsssss')
        }res.locals.cartItems = cartItems;
    } else {
        res.locals.cartItems = [];
    }
    next();
    
}

const isLoggedIn = (req, res, next)=>{
    if(!req.session.currentUser){
        res.redirect('/login')
    }
    next()
}

module.exports = {
    fetchCategoryLinks,
    addShoppingCartToLocals,
    loopThroughCartSession,
    isLoggedIn
};