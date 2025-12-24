import dotenv from 'dotenv';
import { sendOrderConfirmationEmail } from './services/emailService.js';

// Load .env from current directory
dotenv.config();

// Test data
const testOrderData = {
  orderId: 'TEST-ORD-' + Date.now(),
  customerEmail: process.env.TEST_EMAIL || 'test@example.com',
  customerName: 'Test Customer',
  customerPhone: process.env.TEST_PHONE || '+919876543210',
  orderDate: new Date().toISOString(),
  items: [
    {
      product_name: 'Test Product 1',
      quantity: 2,
      price: 500
    },
    {
      product_name: 'Test Product 2',
      quantity: 1,
      price: 1000
    }
  ],
  subtotal: 2000,
  deliveryCharge: 50,
  total: 2050,
  paymentMethod: 'cod',
  deliveryAddress: {
    name: 'Test Customer',
    address: '123 Test Street, Test Building',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+919876543210'
  },
  trackingUrl: 'http://localhost:5173/orders'
};

console.log('🧪 Testing Email Notification System...\n');

// Test Email
console.log('📧 Testing Email Service...');
console.log(`   Sending to: ${testOrderData.customerEmail}`);

sendOrderConfirmationEmail(testOrderData)
  .then(result => {
    console.log('   ✅ Email sent successfully!');
    console.log(`   Message ID: ${result.messageId}\n`);
    console.log('🎉 Test completed!\n');
    console.log('Check your email inbox for the order confirmation.');
    process.exit(0);
  })
  .catch(error => {
    console.error('   ❌ Email failed:', error.message, '\n');
    process.exit(1);
  });
