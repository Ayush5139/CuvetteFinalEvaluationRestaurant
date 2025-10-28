import Order, { MenuItemModel } from "../models/clientModel.js";
import { Chef, Table } from "../models/restaurantModel.js";
import mongoose from "mongoose";

export async function getChefs(req, res) {
    try {
        const menuItems = await Chef.find();
        // console.log(menuItems);
        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error fetching chef", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getTables(req, res) {
    try {
        const menuItems = await Table.find();
        // console.log(menuItems);
        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error fetching tables", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function addTable(req, res) {
    const tables = req.body;
    console.log(req.body)
    try {
        const result = await Table.create(tables);
        console.log("✅ Tables added successfully:", result);
    } catch (error) {
        console.error("❌ Error inserting tables:", error);
    }
}

export async function assignChefToOrder(req, res) {
    try {
        const { orderId, chefId } = req.body;
        const chef = await Chef.findById(chefId);
        if (!chef) {
            return res.status(404).json({ message: "Chef not found" });
        }
        const order = await Order.findByIdAndUpdate(
            orderId,
            { chefId },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            success: true,
            message: "Chef assigned to order successfully",
        });
    } catch (err) {
        console.error("❌ Error assigning chef to order:", err.message);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

export async function deleteTable(req, res) {
    const { id } = req.params;
    console.log("Deleting table with ID:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid table ID format" });
    }
    try {
        const deletedTable = await Table.findByIdAndDelete(id);
        if (!deletedTable) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.json({ message: "✅ Table deleted successfully", deletedTable });
    } catch (error) {
        console.error("Error deleting table:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function getOrdersForRestaurant(req, res) {
    try {
        const orders = await Order.find()
            .populate("orderItems.productId") // populate items
            .populate("chefId", "name") // populate chef
            .populate("tableId", "name numOfChairs isOccupied") // populate table
            // .populate("userId", "name email") // uncomment if needed
            .sort({ createdAt: -1 }); // newest orders first

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "✅ Orders fetched successfully",
            totalOrders: orders.length,
            data: orders,
        });
    } catch (err) {
        console.error("❌ Error fetching orders:", err.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}

export async function completeOrder(req, res) {
    try {
        // 69009677cc3a1e078beca424
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        order.progressStatus = "completed";
        await order.save();
        const leastBusyChef = await Chef.findById(order.chefId);
        leastBusyChef.order -= 1;
        await leastBusyChef.save();

        console.log(order.tableId, "order.tableIdorder.tableIdorder.tableId")
        let assignedTable = await Table.findById(order.tableId);

        if (!assignedTable) {
            // console.log(assignedTable, "assignedTable in if")
            return res.status(400).json({ message: "No available table for the group size" });
        }
        assignedTable.isOccupied = false;
        await assignedTable.save();
        res.status(200).json({
            success: true,
            message: "Order marked as completed",
            data: order,
        });
    } catch (err) {
        console.error("❌ Error completing order:", err.message);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
}

export async function getMenuRestaurant(req, res) {
    try {
        const menuItems = await MenuItemModel.find();
        // console.log(menuItems);
        res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}