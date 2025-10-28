import mongoose from "mongoose";

const chefSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        order: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Chef = mongoose.model("Chef", chefSchema);

const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    numOfChairs: {
      type: Number,
      required: true,
      min: 2,
      max:6 
    },
    isOccupied: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

export const Table = mongoose.model("Table", tableSchema);

// const tables = [
//   {name: "T1", numOfChairs: 4, isOccupied: false },
//   {name: "T2", numOfChairs: 6, isOccupied: true },
// ];

// // 3️⃣ Insert into DB
// export async function insertTables() {
//   try {
//     // Optional: clear old data first
//     // await Table.deleteMany({});

//     const result = await Table.insertMany(tables);
//     console.log("✅ Tables added successfully:", result);
//   } catch (error) {
//     console.error("❌ Error inserting tables:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// insertTables();

