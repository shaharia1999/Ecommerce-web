// Sample Backend API Structure for Order Management
// You can use this as reference when you set up your actual backend

// Sample Express.js backend structure:

/*
// server.js or app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample Order Schema (for MongoDB with Mongoose):
const orderSchema = {
  orderId: String,
  customer: {
    name: String,
    mobile: String,
    district: String,
    address: String
  },
  product: {
    title: String,
    price: Number,
    oldPrice: Number,
    image: String,
    discount: Number,
    selectedSize: String,
    selectedColor: String,
    quantity: Number
  },
  payment: {
    method: String, // 'cod' for Cash on Delivery
    subtotal: Number,
    deliveryCharge: Number,
    total: Number,
    promoCode: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
};

// API Endpoints:

// 1. Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Generate unique order ID
    const orderId = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    
    // Save order to database
    const newOrder = {
      ...orderData,
      orderId,
      status: 'pending'
    };
    
    // TODO: Save to your database
    // const savedOrder = await Order.save(newOrder);
    
    console.log('New Order Received:', newOrder);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: orderId,
      data: newOrder
    });
    
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// 2. Get Order by ID
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // TODO: Fetch from your database
    // const order = await Order.findOne({ orderId });
    
    res.json({
      success: true,
      data: order
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
});

// 3. Update Order Status
app.patch('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    // TODO: Update in your database
    // const updatedOrder = await Order.findOneAndUpdate(
    //   { orderId },
    //   { status },
    //   { new: true }
    // );
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

// 4. Get All Orders (for admin)
app.get('/api/orders', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    // TODO: Fetch from your database with pagination
    // const orders = await Order.find(status ? { status } : {})
    //   .limit(limit * 1)
    //   .skip((page - 1) * limit)
    //   .sort({ orderDate: -1 });
    
    res.json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: orders.length
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/

// Sample request/response examples:

/*
POST /api/orders
Content-Type: application/json

Request Body:
{
  "customer": {
    "name": "John Doe",
    "mobile": "01712345678",
    "district": "ঢাকা",
    "address": "123 Main Street, Dhaka"
  },
  "product": {
    "title": "Premium T-Shirt",
    "price": 25.99,
    "oldPrice": 35.99,
    "image": "/images/tshirt.jpg",
    "discount": 10,
    "selectedSize": "L",
    "selectedColor": "#FF0000",
    "quantity": 2
  },
  "payment": {
    "method": "cod",
    "subtotal": 51.98,
    "deliveryCharge": 109,
    "total": 160.98,
    "promoCode": "SAVE10"
  },
  "orderDate": "2025-07-04T10:30:00.000Z"
}

Response:
{
  "success": true,
  "message": "Order created successfully",
  "orderId": "ORD1720097400000ABC123",
  "data": {
    "orderId": "ORD1720097400000ABC123",
    "customer": { ... },
    "product": { ... },
    "payment": { ... },
    "status": "pending",
    "orderDate": "2025-07-04T10:30:00.000Z"
  }
}
*/

// Frontend API Configuration:
export const API_CONFIG = {
  // Replace with your actual backend URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  
  // API endpoints
  ENDPOINTS: {
    ORDERS: '/orders',
    ORDER_BY_ID: (id) => `/orders/${id}`,
    UPDATE_ORDER_STATUS: (id) => `/orders/${id}/status`
  }
};

// Sample axios configuration for frontend:
/*
import axios from 'axios';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (if needed for auth tokens)
api.interceptors.request.use((config) => {
  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor (for error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
*/
