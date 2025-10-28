const route = require("express").Router()
const { getMenu, userLogin, addOrder, getUserOrders, getUser, updateOrder } = require("../Controller/clientController")

route.get("/getmenu", getMenu)
route.get("/getorder/:userId", getUserOrders)
route.get("/getuser/:userId", getUser)
route.post("/userlogin",userLogin)
route.post("/addorder",addOrder)
route.post("/updateorder",updateOrder)

module.exports = route