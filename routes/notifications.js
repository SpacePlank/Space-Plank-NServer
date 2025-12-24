import express from 'express';
import { sendOrderConfirmationEmail } from '../services/emailService.js';

const router = express.Router();

// Send order confirmation email
router.post('/email/order-confirmation', async (req, res) => {
  try {
    const orderData = req.body;
    
    if (!orderData.customerEmail) {
      return res.status(400).json({ 
        success: false, 
        error: 'Customer email is required' 
      });
    }

    const result = await sendOrderConfirmationEmail(orderData);
    
    res.json({ 
      success: true, 
      message: 'Order confirmation email sent successfully',
      messageId: result.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email',
      message: error.message 
    });
  }
});

export default router;
