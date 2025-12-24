import twilio from 'twilio';

// Create Twilio client
const createTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (!accountSid || !authToken) {
    throw new Error('Twilio credentials not configured');
  }
  
  return twilio(accountSid, authToken);
};

// Format phone number for WhatsApp
const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If number doesn't start with country code, assume India (+91)
  if (!cleaned.startsWith('91') && cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  
  return `whatsapp:+${cleaned}`;
};

// Send WhatsApp message
export const sendWhatsAppMessage = async ({ orderId, customerPhone, customerName, trackingUrl }) => {
  try {
    const client = createTwilioClient();
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM;
    
    if (!fromNumber) {
      throw new Error('Twilio WhatsApp number not configured');
    }

    const message = `
🎉 *Order Confirmed!*

Hi ${customerName},

Your order has been successfully placed!

📦 *Order ID:* ${orderId}

✅ Your order is being processed and will be delivered soon.

🔗 *Track your order:*
${trackingUrl}

Thank you for shopping with us! 🛍️

Need help? Contact our support team.
    `.trim();

    const result = await client.messages.create({
      from: fromNumber,
      to: formatPhoneNumber(customerPhone),
      body: message
    });

    console.log('✅ WhatsApp sent:', result.sid);
    
    return {
      success: true,
      sid: result.sid
    };
  } catch (error) {
    console.error('❌ WhatsApp error:', error);
    throw error;
  }
};
