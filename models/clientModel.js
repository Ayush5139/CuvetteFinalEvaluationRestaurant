import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    persons: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: Number,
        required: true,
    },
},);

export const userModel = mongoose.model("user_data", userSchema);

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    averagePreparationTime: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String
    },
});

export const MenuItemModel = mongoose.model("MenuItem", menuItemSchema);
// export const MenuItemModel = mongoose.model("MenuItem", itemSchema);
// export default MenuItemModel;

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem", // 👈 link to your menu items collection
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);


const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      type: [orderItemSchema],
      required: true,
    },
    isDineIn: {
      type: Boolean,
      default: false, // false = Takeaway, true = Dine-In
      required: true,
    },
    cookingInstructions: {
      type: String,
      trim: true,
      default: "",
    },
    progressStatus: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
    chefId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chef",
      default: null, // no chef assigned initially
    },
    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table", // reference to your Table model
      default: null, // null for takeaway orders
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;




