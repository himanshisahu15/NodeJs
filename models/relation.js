import Category from "./categoryModel.js";
import OrderItem from "./orderItemModel.js";
import Order from "./orderModel.js";
import Product from "./productModel.js";
import User from "./userModel.js";


User.hasMany(Order,{foreignKey:'userId'});
Order.belongsTo(User,{foreignKey:'userId'});

Category.hasMany(Product,{foreignKey:'categoryId'});
Product.belongsTo(Category,{foreignKey:'categoryId'});

Order.hasMany(OrderItem,{foreignKey:"orderId"});
OrderItem.belongsTo(Order,{foreignKey:"orderId"});

Product.hasMany(OrderItem,{foreignKey:'productId'});
OrderItem.belongsTo(Product,{foreignKey:'productId'});

export default {User,Category,Order,OrderItem,Product};