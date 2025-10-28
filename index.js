import express from "express";
import { MenuItemModel, userModel } from './models/clientModel.js';
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { getMenu, test } from "./Controller/clientController.js";
import clientRoute from "./Routes/clientRoutes.js";
import restaurantRoute from "./Routes/restaurantRoutes.js";
import { getOrdersForRestaurant } from "./Controller/restaurantController.js";
const app = express();
const port = process.env.PORT || 5000;
console.log(`Server running on port: ${port}`);

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/client", clientRoute);
app.use("/api/restaurant", restaurantRoute);
app.get("/api/hello", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

const orderData = {
  name: "Aarav Sharma",
  persons: 3,
  address: "123 Green Street, Mumbai",
  contact: 9876543210,
};

export const sampleMenuItems = [
  {
    "name": "Deluxe Beef Burger",
    "description": "A deluxe beef burger made with premium ingredients.",
    "price": 250,
    "averagePreparationTime": 12,
    "category": "Burger",
    "stock": 15,
    "imgUrl": "https://prairiemeats.ca/wp-content/uploads/2019/12/Burger-Stock3.jpg"
  },
  {
    "name": "Spicy Chicken Burger",
    "description": "A spicy chicken burger made with premium ingredients.",
    "price": 190,
    "averagePreparationTime": 10,
    "category": "Burger",
    "stock": 20,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkcOnvdQ7RiDJpVQBbx6duq3LxqyEq_3bqDw&s"
  },
  {
    "name": "Classic Paneer Burger",
    "description": "A classic paneer burger made with premium ingredients.",
    "price": 160,
    "averagePreparationTime": 9,
    "category": "Burger",
    "stock": 12,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf76mZaVoKZsaySfRTkLKw_gwmZ-4m_q-Bsw&s"
  },
  {
    "name": "Loaded Veggie Burger",
    "description": "A loaded veggie burger made with premium ingredients.",
    "price": 180,
    "averagePreparationTime": 11,
    "category": "Burger",
    "stock": 25,
    "imgUrl": "https://www.foodandwine.com/thmb/XE8ubzwObCIgMw7qJ9CsqUZocNM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg"
  },
  {
    "name": "Cheesy BBQ Burger",
    "description": "A cheesy bbq burger made with premium ingredients.",
    "price": 220,
    "averagePreparationTime": 13,
    "category": "Burger",
    "stock": 18,
    "imgUrl": "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg"
  },
  {
    "name": "Tangy Peri Peri Burger",
    "description": "A tangy peri peri burger made with premium ingredients.",
    "price": 210,
    "averagePreparationTime": 10,
    "category": "Burger",
    "stock": 16,
    "imgUrl": "https://images.unsplash.com/photo-1590080875831-26a57e89bdbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Double Cheese Burger",
    "description": "A double cheese burger made with premium ingredients.",
    "price": 240,
    "averagePreparationTime": 12,
    "category": "Burger",
    "stock": 22,
    "imgUrl": "https://hips.hearstapps.com/hmg-prod/images/chicken-burgers-index-667b185b5f528.jpg?crop=0.500xw:1.00xh;0.282xw,0&resize=1200:*"
  },
  {
    "name": "Smoky Classic Burger",
    "description": "A smoky classic burger made with premium ingredients.",
    "price": 200,
    "averagePreparationTime": 11,
    "category": "Burger",
    "stock": 14,
    "imgUrl": "https://assets.cntraveller.in/photos/60ba26c0bfe773a828a47146/16:9/w_1024%2Cc_limit/Burgers-Mumbai-Delivery.jpg"
  },

  {
    "name": "Classic Margherita Pizza",
    "description": "A classic margherita pizza made with premium ingredients.",
    "price": 320,
    "averagePreparationTime": 14,
    "category": "Pizza",
    "stock": 10,
    "imgUrl": "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_366/RX_THUMBNAIL/IMAGES/VENDOR/2024/6/26/d112a6d7-d173-4ca7-a5ee-40f845719d18_841144.JPG"
  },
  {
    "name": "Cheesy Pepperoni Pizza",
    "description": "A cheesy pepperoni pizza made with premium ingredients.",
    "price": 350,
    "averagePreparationTime": 15,
    "category": "Pizza",
    "stock": 14,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIibPbOeDQQscm9g-fDNdCvROokQJukg8nYQ&s"
  },
  {
    "name": "Tangy Veg Supreme Pizza",
    "description": "A tangy veg supreme pizza made with premium ingredients.",
    "price": 300,
    "averagePreparationTime": 13,
    "category": "Pizza",
    "stock": 19,
    "imgUrl": "https://www.yummytummyaarthi.com/wp-content/uploads/2015/11/chicken-pizza-1.jpeg"
  },
  {
    "name": "Smoky BBQ Chicken Pizza",
    "description": "A smoky bbq chicken pizza made with premium ingredients.",
    "price": 340,
    "averagePreparationTime": 16,
    "category": "Pizza",
    "stock": 22,
    "imgUrl": "https://assets.surlatable.com/m/15a89c2d9c6c1345/72_dpi_webp-REC-283110_Pizza.jpg"
  },
  {
    "name": "Loaded Cheese Burst Pizza",
    "description": "A loaded cheese burst pizza made with premium ingredients.",
    "price": 370,
    "averagePreparationTime": 18,
    "category": "Pizza",
    "stock": 15,
    "imgUrl": "https://www.foodandwine.com/thmb/iJw7N_NfcPpd-EB8rpYbzrkSFIM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/tomato-mozzarella-pizza-FT-RECIPE0725-e7244e979c504188a049623668c15b2e.jpg"
  },
  {
    "name": "Zesty Farmhouse Pizza",
    "description": "A zesty farmhouse pizza made with premium ingredients.",
    "price": 310,
    "averagePreparationTime": 15,
    "category": "Pizza",
    "stock": 18,
    "imgUrl": "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"
  },
  {
    "name": "Double Cheese Veg Pizza",
    "description": "A double cheese veg pizza made with premium ingredients.",
    "price": 330,
    "averagePreparationTime": 17,
    "category": "Pizza",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1627308595186-e6bb0b6b9b07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Spicy Paneer Pizza",
    "description": "A spicy paneer pizza made with premium ingredients.",
    "price": 340,
    "averagePreparationTime": 16,
    "category": "Pizza",
    "stock": 14,
    "imgUrl": "https://imgmediagumlet.lbb.in/media/2025/07/688b48a128c5ed2b5e2f4a14_1753958561150.jpg"
  },

  {
    "name": "Refreshing Cola Drink",
    "description": "A refreshing cola drink made with premium ingredients.",
    "price": 60,
    "averagePreparationTime": 3,
    "category": "Drink",
    "stock": 30,
    "imgUrl": "https://img.freepik.com/free-psd/refreshing-ice-cold-cola-drink-glass-with-splash_632498-25634.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    "name": "Zesty Lemonade Drink",
    "description": "A zesty lemonade drink made with premium ingredients.",
    "price": 70,
    "averagePreparationTime": 4,
    "category": "Drink",
    "stock": 25,
    "imgUrl": "https://www.liquor.com/thmb/0zPi6PlxlFNpyhzbqVwU8LKG7og=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/americano-720x720-primary-49c598b03d2348c0822239979b73883c.jpg"
  },
  {
    "name": "Classic Mojito Drink",
    "description": "A classic mojito drink made with premium ingredients.",
    "price": 90,
    "averagePreparationTime": 5,
    "category": "Drink",
    "stock": 18,
    "imgUrl": "https://img.freepik.com/free-psd/refreshing-ice-cold-cola-drink-glass-with-splash_632498-25634.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    "name": "Creamy Cold Coffee Drink",
    "description": "A creamy cold coffee drink made with premium ingredients.",
    "price": 120,
    "averagePreparationTime": 6,
    "category": "Drink",
    "stock": 12,
    "imgUrl": "https://thewoods.net.in/wp-content/uploads/2021/02/hotcofee.jpg"
  },
  {
    "name": "Fresh Orange Juice Drink",
    "description": "A fresh orange juice drink made with premium ingredients.",
    "price": 80,
    "averagePreparationTime": 3,
    "category": "Drink",
    "stock": 20,
    "imgUrl": "https://www.liquor.com/thmb/0zPi6PlxlFNpyhzbqVwU8LKG7og=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/americano-720x720-primary-49c598b03d2348c0822239979b73883c.jpg"
  },
  {
    "name": "Classic Iced Tea Drink",
    "description": "A classic iced tea drink made with premium ingredients.",
    "price": 90,
    "averagePreparationTime": 4,
    "category": "Drink",
    "stock": 14,
    "imgUrl": "https://assets.malibudrinks.com/wp-content/uploads/2024/03/Malibu-Sunrise-1x1-1-scaled.jpg?tr=q-80,w-2560"
  },
  {
    "name": "Chilled Mango Shake Drink",
    "description": "A chilled mango shake drink made with premium ingredients.",
    "price": 110,
    "averagePreparationTime": 6,
    "category": "Drink",
    "stock": 10,
    "imgUrl": "https://theallnaturalvegan.com/wp-content/uploads/2023/08/mango-juice-featured-image-500x500.jpg"
  },

  {
    "name": "Crispy Classic French fries",
    "description": "A crispy classic french fries made with premium ingredients.",
    "price": 110,
    "averagePreparationTime": 7,
    "category": "French fries",
    "stock": 25,
    "imgUrl": "https://www.recipetineats.com/tachyon/2022/09/Crispy-Fries_8.jpg"
  },
  {
    "name": "Cheesy Masala French fries",
    "description": "A cheesy masala french fries made with premium ingredients.",
    "price": 130,
    "averagePreparationTime": 8,
    "category": "French fries",
    "stock": 18,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8N0tUijh_HHnvvTSUA-vNph2IuwTKWUgoYg&s"
  },
  {
    "name": "Loaded Curly French fries",
    "description": "A loaded curly french fries made with premium ingredients.",
    "price": 150,
    "averagePreparationTime": 9,
    "category": "French fries",
    "stock": 20,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOx-SR5j_W3-oFysSIgllwLEe8lSGzG7TU5A&s"
  },
  {
    "name": "Tangy Peri Peri French fries",
    "description": "A tangy peri peri french fries made with premium ingredients.",
    "price": 140,
    "averagePreparationTime": 8,
    "category": "French fries",
    "stock": 22,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT6sCUZC60QtPM_qQrFraQKMhpVjw564x0tg&s"
  },
  {
    "name": "Spicy Cheese French fries",
    "description": "A spicy cheese french fries made with premium ingredients.",
    "price": 135,
    "averagePreparationTime": 9,
    "category": "French fries",
    "stock": 17,
    "imgUrl": "https://www.savoryexperiments.com/wp-content/uploads/2024/02/Cajun-Fries-19.jpg"
  },
  {
    "name": "Deluxe Loaded Fries",
    "description": "A deluxe loaded fries made with premium ingredients.",
    "price": 160,
    "averagePreparationTime": 10,
    "category": "French fries",
    "stock": 15,
    "imgUrl": "https://images.squarespace-cdn.com/content/v1/5ed13dd3465af021e2c1342b/4884db9f-8f8c-4854-a403-99ab3a03e3ad/IMG_9989.jpg"
  },
  {
    "name": "Zesty Curly Fries",
    "description": "A zesty curly fries made with premium ingredients.",
    "price": 145,
    "averagePreparationTime": 8,
    "category": "French fries",
    "stock": 18,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_rJJJ7jnVYbiii3Gnqk3edvO08iqinDaUsg&s"
  },
  {
    "name": "Classic Masala Fries",
    "description": "A classic masala fries made with premium ingredients.",
    "price": 120,
    "averagePreparationTime": 7,
    "category": "French fries",
    "stock": 20,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1XOIfo1yMawAd3lRbpbGkHZS_w9pmGRv6CQ&s"
  },

  {
    "name": "Grilled Mix Veggies",
    "description": "A grilled mix veggies made with premium ingredients.",
    "price": 180,
    "averagePreparationTime": 10,
    "category": "Veggies",
    "stock": 16,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkGN_KCfFaI8hylXyce-aP-PVyhaf7MSE2Uw&s"
  },
  {
    "name": "Creamy Paneer Delight Veggies",
    "description": "A creamy paneer delight veggies made with premium ingredients.",
    "price": 200,
    "averagePreparationTime": 12,
    "category": "Veggies",
    "stock": 20,
    "imgUrl": "https://s23209.pcdn.co/wp-content/uploads/2020/08/Easy-Grilled-VegetablesIMG_0768.jpg"
  },
  {
    "name": "Spicy Veg Curry Veggies",
    "description": "A spicy veg curry veggies made with premium ingredients.",
    "price": 220,
    "averagePreparationTime": 14,
    "category": "Veggies",
    "stock": 18,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGhBDosbJOtygTeNgt0OT1UWg-JlJgzEsBAQ&s"
  },
  {
    "name": "Zesty Broccoli Bowl Veggies",
    "description": "A zesty broccoli bowl veggies made with premium ingredients.",
    "price": 190,
    "averagePreparationTime": 11,
    "category": "Veggies",
    "stock": 15,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqLYMeVeepWwR1Vt_e-5hubG2KeBeSnyS2aQ&s"
  },
  {
    "name": "Fresh Stir Fry Veggies",
    "description": "A fresh stir fry veggies made with premium ingredients.",
    "price": 175,
    "averagePreparationTime": 10,
    "category": "Veggies",
    "stock": 22,
    "imgUrl": "https://s23209.pcdn.co/wp-content/uploads/2014/10/Roasted-VegetablesIMG_0409.jpg"
  },
  {
    "name": "Cheesy Mushroom Veggies",
    "description": "A cheesy mushroom veggies made with premium ingredients.",
    "price": 210,
    "averagePreparationTime": 12,
    "category": "Veggies",
    "stock": 18,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3vDMp898I1cxvAfcp_FWbHJNCJu5iCNm_Q&s"
  },
  {
    "name": "Smoky Corn Bowl Veggies",
    "description": "A smoky corn bowl veggies made with premium ingredients.",
    "price": 185,
    "averagePreparationTime": 11,
    "category": "Veggies",
    "stock": 14,
    "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW95nv31iZDvBal1vdral9pY-TpvgqceBVLg&s"
  },
  {
    "name": "Crispy Chicken Supreme Burger",
    "description": "A crispy chicken supreme burger topped with fresh lettuce and tangy sauce.",
    "price": 230,
    "averagePreparationTime": 11,
    "category": "Burger",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Classic Veggie Delight Burger",
    "description": "A delicious veggie burger made with a spiced patty and melted cheese.",
    "price": 170,
    "averagePreparationTime": 10,
    "category": "Burger",
    "stock": 18,
    "imgUrl": "https://images.unsplash.com/photo-1610970878458-9985113fa8b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Ultimate Triple Patty Burger",
    "description": "Three juicy beef patties stacked with cheese and smoky BBQ sauce.",
    "price": 280,
    "averagePreparationTime": 14,
    "category": "Burger",
    "stock": 10,
    "imgUrl": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
  },

  {
    "name": "Cheesy Chicken Supreme Pizza",
    "description": "A cheesy chicken supreme pizza with spicy toppings and herbs.",
    "price": 360,
    "averagePreparationTime": 17,
    "category": "Pizza",
    "stock": 15,
    "imgUrl": "https://images.unsplash.com/photo-1601924582971-6e3d8c3e49a6?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Mediterranean Veg Pizza",
    "description": "Loaded with olives, peppers, and feta cheese on a crispy crust.",
    "price": 340,
    "averagePreparationTime": 15,
    "category": "Pizza",
    "stock": 17,
    "imgUrl": "https://images.unsplash.com/photo-1594007654729-407eedc4be26?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Classic Chicken Tikka Pizza",
    "description": "A pizza topped with tender chicken tikka and rich tomato sauce.",
    "price": 355,
    "averagePreparationTime": 16,
    "category": "Pizza",
    "stock": 12,
    "imgUrl": "https://images.unsplash.com/photo-1594007654729-407eedc4be26?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Classic Hot Coffee Drink",
    "description": "A freshly brewed hot coffee made with premium beans.",
    "price": 100,
    "averagePreparationTime": 5,
    "category": "Drink",
    "stock": 16,
    "imgUrl": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Minty Green Mojito Drink",
    "description": "A minty mojito with a hint of lime for a refreshing twist.",
    "price": 95,
    "averagePreparationTime": 4,
    "category": "Drink",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1617196034796-73f8e6b7bdfa?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Strawberry Shake Drink",
    "description": "A creamy strawberry shake blended with fresh berries.",
    "price": 120,
    "averagePreparationTime": 6,
    "category": "Drink",
    "stock": 14,
    "imgUrl": "https://images.unsplash.com/photo-1622484575181-6c7c6b9b93c8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Garlic Parmesan Fries",
    "description": "Crispy fries tossed with garlic, parmesan, and herbs.",
    "price": 150,
    "averagePreparationTime": 9,
    "category": "French fries",
    "stock": 18,
    "imgUrl": "https://images.unsplash.com/photo-1606755962773-0e33dba8a1d2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Chili Cheese Fries",
    "description": "Golden fries topped with chili and melted cheese sauce.",
    "price": 155,
    "averagePreparationTime": 10,
    "category": "French fries",
    "stock": 14,
    "imgUrl": "https://images.unsplash.com/photo-1606755962773-0e33dba8a1d2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Smoky BBQ Fries",
    "description": "Smoky BBQ fries coated with a tangy seasoning blend.",
    "price": 145,
    "averagePreparationTime": 8,
    "category": "French fries",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Sautéed Mix Veggies",
    "description": "A healthy mix of sautéed vegetables cooked to perfection.",
    "price": 190,
    "averagePreparationTime": 10,
    "category": "Veggies",
    "stock": 15,
    "imgUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Spicy Stir Fried Broccoli",
    "description": "A spicy stir-fried broccoli with garlic and soy glaze.",
    "price": 200,
    "averagePreparationTime": 12,
    "category": "Veggies",
    "stock": 18,
    "imgUrl": "https://images.unsplash.com/photo-1601050690597-7578b6dba1b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Creamy Spinach Bowl",
    "description": "A creamy spinach bowl with herbs and melted cheese.",
    "price": 210,
    "averagePreparationTime": 11,
    "category": "Veggies",
    "stock": 12,
    "imgUrl": "https://images.unsplash.com/photo-1590080875831-26a57e89bdbb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Crispy Chicken Supreme Burger",
    "description": "A crispy chicken supreme burger topped with fresh lettuce and tangy sauce.",
    "price": 230,
    "averagePreparationTime": 11,
    "category": "Burger",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Ultimate Triple Patty Burger",
    "description": "Three juicy beef patties stacked with cheese and smoky BBQ sauce.",
    "price": 280,
    "averagePreparationTime": 14,
    "category": "Burger",
    "stock": 10,
    "imgUrl": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Crispy Paneer Crunch Burger",
    "description": "A crispy paneer patty layered with creamy mayo and lettuce.",
    "price": 190,
    "averagePreparationTime": 10,
    "category": "Burger",
    "stock": 16,
    "imgUrl": "https://images.unsplash.com/photo-1625944230949-067c502e2b2c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Spicy Mexican Burger",
    "description": "A spicy Mexican-style burger with jalapeños and salsa sauce.",
    "price": 220,
    "averagePreparationTime": 12,
    "category": "Burger",
    "stock": 18,
    "imgUrl": "https://images.unsplash.com/photo-1626082927389-5cb8e5e9ff6b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Cheese Overload Burger",
    "description": "A burger dripping with layers of molten cheese and grilled veggies.",
    "price": 250,
    "averagePreparationTime": 13,
    "category": "Burger",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80"
  },

  /* ---------- PIZZAS ---------- */
  {
    "name": "Mediterranean Veg Pizza",
    "description": "Loaded with olives, peppers, and feta cheese on a crispy crust.",
    "price": 340,
    "averagePreparationTime": 15,
    "category": "Pizza",
    "stock": 17,
    "imgUrl": "https://images.unsplash.com/photo-1594007654729-407eedc4be26?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Tandoori Chicken Pizza",
    "description": "Authentic Indian-style pizza topped with tandoori chicken chunks.",
    "price": 360,
    "averagePreparationTime": 16,
    "category": "Pizza",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1622495892953-88e958c872a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Four Cheese Pizza",
    "description": "Cheesy perfection made with mozzarella, cheddar, parmesan, and gouda.",
    "price": 370,
    "averagePreparationTime": 17,
    "category": "Pizza",
    "stock": 14,
    "imgUrl": "https://images.unsplash.com/photo-1601924582971-6e3d8c3e49a6?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Pesto Veggie Pizza",
    "description": "A thin crust pizza with basil pesto, mozzarella, and grilled veggies.",
    "price": 345,
    "averagePreparationTime": 14,
    "category": "Pizza",
    "stock": 16,
    "imgUrl": "https://images.unsplash.com/photo-1618213833855-d25003d9de72?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Mushroom Truffle Pizza",
    "description": "A gourmet pizza with truffle oil, mushrooms, and creamy cheese sauce.",
    "price": 380,
    "averagePreparationTime": 18,
    "category": "Pizza",
    "stock": 12,
    "imgUrl": "https://images.unsplash.com/photo-1613145993482-6f03b478a1b6?auto=format&fit=crop&w=800&q=80"
  },

  /* ---------- DRINKS ---------- */
  {
    "name": "Strawberry Shake Drink",
    "description": "A creamy strawberry shake blended with fresh berries.",
    "price": 120,
    "averagePreparationTime": 6,
    "category": "Drink",
    "stock": 14,
    "imgUrl": "https://images.unsplash.com/photo-1622484575181-6c7c6b9b93c8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Tropical Pineapple Drink",
    "description": "A tropical pineapple cooler made with natural fruit juice.",
    "price": 85,
    "averagePreparationTime": 4,
    "category": "Drink",
    "stock": 25,
    "imgUrl": "https://images.unsplash.com/photo-1617196034796-73f8e6b7bdfa?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Caramel Cold Coffee Drink",
    "description": "Rich cold coffee topped with caramel and whipped cream.",
    "price": 130,
    "averagePreparationTime": 5,
    "category": "Drink",
    "stock": 12,
    "imgUrl": "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Blue Lagoon Drink",
    "description": "A vibrant blue lagoon mocktail with lemon and mint essence.",
    "price": 100,
    "averagePreparationTime": 4,
    "category": "Drink",
    "stock": 18,
    "imgUrl": "https://images.unsplash.com/photo-1590080875831-26a57e89bdbb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Hazelnut Iced Coffee Drink",
    "description": "Smooth hazelnut-flavored iced coffee with a creamy texture.",
    "price": 125,
    "averagePreparationTime": 6,
    "category": "Drink",
    "stock": 14,
    "imgUrl": "https://images.unsplash.com/photo-1573508293578-80f08531c1a9?auto=format&fit=crop&w=800&q=80"
  },

  /* ---------- FRENCH FRIES ---------- */
  {
    "name": "Truffle Fries",
    "description": "Crispy fries tossed with truffle oil and grated parmesan.",
    "price": 160,
    "averagePreparationTime": 10,
    "category": "French fries",
    "stock": 16,
    "imgUrl": "https://images.unsplash.com/photo-1627308595186-e6bb0b6b9b07?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Honey Mustard Fries",
    "description": "Fries coated in sweet and tangy honey mustard dressing.",
    "price": 150,
    "averagePreparationTime": 8,
    "category": "French fries",
    "stock": 18,
    "imgUrl": "https://images.unsplash.com/photo-1606755962773-0e33dba8a1d2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Schezwan Spicy Fries",
    "description": "Fries tossed with hot Schezwan sauce for a fiery kick.",
    "price": 140,
    "averagePreparationTime": 9,
    "category": "French fries",
    "stock": 22,
    "imgUrl": "https://images.unsplash.com/photo-1622495892953-88e958c872a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Loaded Chicken Fries",
    "description": "Fries loaded with spicy chicken chunks and creamy cheese sauce.",
    "price": 170,
    "averagePreparationTime": 10,
    "category": "French fries",
    "stock": 12,
    "imgUrl": "https://images.unsplash.com/photo-1606755962773-0e33dba8a1d2?auto=format&fit=crop&w=800&q=80"
  },

  /* ---------- VEGGIES ---------- */
  {
    "name": "Honey Glazed Carrots",
    "description": "Sweet honey-glazed carrots roasted with butter and herbs.",
    "price": 180,
    "averagePreparationTime": 10,
    "category": "Veggies",
    "stock": 14,
    "imgUrl": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Grilled Zucchini Mix",
    "description": "Zucchini slices grilled with garlic butter and seasonings.",
    "price": 190,
    "averagePreparationTime": 11,
    "category": "Veggies",
    "stock": 18,
    "imgUrl": "https://images.unsplash.com/photo-1601050690597-7578b6dba1b4?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Roasted Corn & Peppers",
    "description": "A colorful mix of roasted corn and bell peppers with herbs.",
    "price": 200,
    "averagePreparationTime": 12,
    "category": "Veggies",
    "stock": 20,
    "imgUrl": "https://images.unsplash.com/photo-1586810164523-43793867e973?auto=format&fit=crop&w=800&q=80"
  },
  {
    "name": "Creamy Mushroom Bowl",
    "description": "A rich creamy mushroom and broccoli mix topped with cheese.",
    "price": 210,
    "averagePreparationTime": 13,
    "category": "Veggies",
    "stock": 12,
    "imgUrl": "https://images.unsplash.com/photo-1613145993482-6f03b478a1b6?auto=format&fit=crop&w=800&q=80"
  }
]


export async function addOrder() {
  try {
    await MenuItemModel.create(sampleMenuItems);
    console.log("✅ Order added successfully:", sampleMenuItems);
  } catch (err) {
    console.error("❌ Error adding order:", err.message);
  }
}

app.listen(port, () => {
  connectDB();
  // addOrder();
  // test()
  // getOrdersForRestaurant()
  console.log(`Server is running at http://localhost:${port}`);
});
