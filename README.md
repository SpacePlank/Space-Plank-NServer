# 🚀 Notification Server

Backend API for handling email and WhatsApp notifications for order confirmations.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Add your Gmail and Twilio credentials

3. **Start server:**
   ```bash
   npm start
   ```

   Or for development:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST `/api/notifications/email/order-confirmation`
Send order confirmation email

**Request Body:**
```json
{
  "orderId": "ORD1234567890",
  "customerEmail": "customer@example.com",
  "customerName": "John Doe",
  "orderDate": "2024-01-01T00:00:00Z",
  "items": [...],
  "subtotal": 1000,
  "deliveryCharge": 50,
  "total": 1050,
  "paymentMethod": "cod",
  "deliveryAddress": {...},
  "trackingUrl": "https://yoursite.com/orders"
}
```

### POST `/api/notifications/whatsapp/order-confirmation`
Send WhatsApp notification

**Request Body:**
```json
{
  "orderId": "ORD1234567890",
  "customerPhone": "+919876543210",
  "customerName": "John Doe",
  "trackingUrl": "https://yoursite.com/orders"
}
```

## Configuration

See `.env.example` for all configuration options.

## Documentation

For detailed setup instructions, see `NOTIFICATION_SETUP_GUIDE.md` in the root directory.
