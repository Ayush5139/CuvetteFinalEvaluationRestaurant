const { getChefs, getTables, addTable, deleteTable, getOrdersForRestaurant, completeOrder, getMenuRestaurant } = require("../Controller/restaurantController")


const route = require("express").Router()


route.get("/getchefs", getChefs)
route.get("/getmenurestaurant", getMenuRestaurant)
route.get("/gettable", getTables)
route.post("/addtable", addTable)
route.delete("/deletetable/:id", deleteTable)
route.get("/getrestaurantorder", getOrdersForRestaurant)
route.put("/completeorder/:id", completeOrder)



module.exports = route