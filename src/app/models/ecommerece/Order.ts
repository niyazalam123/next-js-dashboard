import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    address: [
        {
            name: String,
            email: String,
            number: Number,
            city: String,
            address: String,
            zipCode: Number,
            state: String
        }
    ],
    totoalPrice: Number,
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "'Delivered", "Cancelled"]
    },
    isPayment: {
        type: Boolean,
        default: false
    },
    product: [
        {
            title: String,
            description: String,
            price: Number,
            quantity: Number,
            image: String,
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "'category"
            }
        }
    ]
})

const Order = mongoose.models.Order || mongoose.model("Order",orderSchema)