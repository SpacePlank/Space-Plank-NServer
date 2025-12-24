import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Generate order confirmation email HTML
const generateOrderEmailHTML = (orderData) => {
  const {
    orderId,
    customerName,
    orderDate,
    items,
    subtotal,
    deliveryCharge,
    total,
    paymentMethod,
    deliveryAddress,
    trackingUrl
  } = orderData;

  const itemsHTML = items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <strong>${item.product_name}</strong><br>
        <small>Qty: ${item.quantity}</small>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${(item.price * item.quantity).toLocaleString('en-IN')}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Thank you for your order</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #667eea; margin-top: 0;">Hi ${customerName},</h2>
          <p>Your order has been successfully placed and is being processed.</p>
          
          <div style="background: #f0f4ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Order ID:</strong> ${orderId}</p>
            <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(orderDate).toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'}</p>
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #667eea; margin-top: 0;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${itemsHTML}
            <tr>
              <td style="padding: 10px; padding-top: 15px;"><strong>Subtotal</strong></td>
              <td style="padding: 10px; padding-top: 15px; text-align: right;">₹${subtotal.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td style="padding: 10px;">Delivery Charge</td>
              <td style="padding: 10px; text-align: right;">${deliveryCharge === 0 ? 'FREE' : '₹' + deliveryCharge}</td>
            </tr>
            <tr style="background: #f0f4ff;">
              <td style="padding: 15px;"><strong style="font-size: 18px;">Total</strong></td>
              <td style="padding: 15px; text-align: right;"><strong style="font-size: 18px; color: #667eea;">₹${total.toLocaleString('en-IN')}</strong></td>
            </tr>
          </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #667eea; margin-top: 0;">Delivery Address</h3>
          <p style="margin: 5px 0;"><strong>${deliveryAddress.name}</strong></p>
          <p style="margin: 5px 0;">${deliveryAddress.address}</p>
          <p style="margin: 5px 0;">${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}</p>
          <p style="margin: 5px 0;">Phone: ${deliveryAddress.phone}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="${trackingUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
            Track Your Order
          </a>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
          <p>Need help? Contact our support team</p>
          <p style="margin: 5px 0;">Questions about your order? Visit our website or contact support.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (orderData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: orderData.customerEmail,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: generateOrderEmailHTML(orderData)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Email error:', error);
    throw error;
  }
};
