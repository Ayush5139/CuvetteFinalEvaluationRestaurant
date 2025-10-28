import Order, { MenuItemModel, userModel } from '../models/clientModel.js';
import { Chef, Table } from '../models/restaurantModel.js';

export async function getMenu(req, res) {
    try {
        const menuItems = await MenuItemModel.find();
        // console.log(menuItems);
        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function userLogin(req, res) {
    try {
        const userData = req.body.customerDetails;
        // if (!userData || !userData.contact) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "Missing contact information in request",
        //   });
        // }
        let existingUser = await userModel.findOne({ contact: userData.contact });
        if (existingUser) {
            console.log("ℹUser already exists:", existingUser.name);
            return res.status(200).json({
                success: true,
                message: "User already exists",
                userId: existingUser._id,
                existing: true,
            });
        }

        const newUser = await userModel.create(userData);
        console.log("New user added successfully:", newUser.name);
        return res.status(201).json({
            success: true,
            message: "New user created successfully",
            userId: newUser._id,
            existing: false,
        });
    } catch (err) {
        console.error("Error in userLogin:", err.message);
        return res.status(500).json({
            success: false,
            message: "Server error while logging in user",
            error: err.message,
        });
    }
}

export async function addOrder(req, res) {
    try {
        const { customerDetails } = req.body;
        const { userId, orderItems } = customerDetails;
        const user = await userModel.findById(userId);
        console.log(user, "useruseruser")
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log(req.body, "req.bodyreq.bodyreq.body")
        const formattedItems = Object.entries(orderItems).map(([productId, quantity]) => ({
            productId,
            quantity,
        }));
        const leastBusyChef = await Chef.findOne().sort({ orderCount: 1 });
        if (!leastBusyChef) {
            return res.status(400).json({ message: "No chefs available" });
        }
        leastBusyChef.order += 1;
        await leastBusyChef.save();

        console.log(formattedItems, "formattedItemsformattedItemsformattedItems")
        const order = await Order.create({
            userId,
            orderItems: formattedItems,
            // isDineIn,
            // tableId: assignedTable ? assignedTable._id : null,
            chefId: leastBusyChef._id,
            progressStatus: "in-progress",
        });
        // res.status(201).json({
        //     success: true,
        //     message: "✅ Order created successfully",
        // });

        res.status(201).json({
            message: "✅ Order created successfully",
            order,
            assignedChef: leastBusyChef.name,
            // assignedTable: assignedTable ? assignedTable.name : null,
        });
    } catch (err) {
        console.error("❌ Error creating order:", err.message);
        res.status(500).json({ error: err.message });
    }
}
export async function updateOrder(req, res) {

    console.log(req.body.updates, "req.bodyreq.body")
    try {
        const { updates } = req.body;
        const { userId, orderItems, dineIn, cookingInstruction, orderId } = updates;
        const user = await userModel.findById(userId);
        console.log(user, "useruseruser")
        if (!user) return res.status(404).json({ message: "User not found" });
        console.log(req.body, "req.body");
        let formattedItems = [];

        if (Array.isArray(orderItems)) {
            formattedItems = orderItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                instructions: item.instructions || "",
            }));
        } else {
            formattedItems = Object.entries(orderItems).map(([productId, quantity]) => ({
                productId,
                quantity,
                instructions: "",
            }));
        }

        console.log(formattedItems, "formattedItems");

        let assignedTable = null;
        if (dineIn == true) {
            assignedTable = await Table.findOne({
                numOfChairs: { $gte: user.persons },
                isOccupied: false,
            }).sort({ numOfChairs: 1 });

            if (!assignedTable) {
                // console.log(assignedTable, "assignedTable in if")
                return res.status(400).json({ message: "No available table for the group size" });
            }
            assignedTable.isOccupied = true;
            await assignedTable.save();
        }
        console.log(assignedTable, "assignedTableassignedTable")

        const existingOrder = await Order.findById(orderId);
        if (!existingOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        let assignedChef = existingOrder.chefId;
        if (!assignedChef) {
            const leastBusyChef = await Chef.findOne().sort({ orderCount: 1 });
            if (leastBusyChef) {
                leastBusyChef.order += 1;
                await leastBusyChef.save();
                assignedChef = leastBusyChef._id;
            }
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                ...(userId && { userId }),
                ...(formattedItems.length && { orderItems: formattedItems }),
                ...(typeof dineIn === "boolean" && { isDineIn: dineIn }),
                ...(cookingInstruction && { cookingInstruction }),
                tableId: assignedTable || null,
                chefId: assignedChef || null,
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "✅ Order updated successfully",
            data: updatedOrder,
        });
        // Create new order
        // const order = await Order.create({
        //     userId,
        //     orderItems: formattedItems,
        //     isDineIn: dineIn ?? false, // default false
        //     cookingInstructions: cookingInstructions || "",
        // });

        // res.status(201).json({
        //     success: true,
        //     message: "✅ Order created successfully",
        //     data: order,
        // });
    } catch (err) {
        console.error("❌ Error creating order:", err.message);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

export async function getUserOrders(req, res) {
    try {
        const { userId } = req.params;
        console.log(userId, "userIduserIduserId")
        const orders = await Order.find({ userId })
            .populate("orderItems.productId")
            .exec();
        res.json(orders);
    } catch (err) {
        console.error("❌ Error fetching orders:", err.message);
        res.status(500).json({ error: err.message });
    }
}
export async function getUser(req, res) {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: user,
        });
    } catch (err) {
        console.error("❌ Error fetching user details:", err.message);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

export async function test() {
    // const leastBusyChef = await Chef.findOne().sort({ order: 1 });
    // console.log(leastBusyChef)
    // const userId = '690092e7c2e70427b1deaef3'
    // const user = await userModel.findById(userId);
    // console.log(user.persons)
}


