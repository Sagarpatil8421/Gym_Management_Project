// backend/server.js
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const Razorpay = require('razorpay');
require('dotenv').config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-notification', async (req, res) => {
  const { email, subject, text } = req.body;

  const msg = {
    to: email,
    from: 'gymmanager@admin.com', 
    subject: subject,
    text: text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send({ success: true, message: 'Notification sent successfully!' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send({ success: false, message: 'Failed to send notification' });
  }
});

app.post('/api/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount, // amount already in paise from frontend
      currency,
      receipt: receipt || `receipt_${Date.now()}`
    });
    res.json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: err.message });
  }
});

// Payment verification endpoint
app.post('/api/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  try {
    // Verify the payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const crypto = require('crypto');
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    if (signature === razorpay_signature) {
      // Payment is verified
      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper to calculate expiry date
function calculateExpiryDate(months) {
  const now = new Date();
  now.setMonth(now.getMonth() + Number(months));
  return now.toISOString().split('T')[0];
}

app.post('/api/create-invoice', async (req, res) => {
  const { 
    amount, 
    currency = 'INR', 
    customer_name, 
    customer_email, 
    description,
    plan_name,
    plan_months // <-- Add this field from frontend
  } = req.body;

  // Calculate expiry date as before
  const expiryDate = calculateExpiryDate(plan_months);

  // Convert expiryDate (YYYY-MM-DD) to Unix timestamp (seconds)
  const dueDateTimestamp = Math.floor(new Date(expiryDate).getTime() / 1000);

  const invoiceData = {
    type: 'invoice',
    date: Math.floor(Date.now() / 1000),
    // due_date: dueDateTimestamp, 
    currency: currency,
    description: description || `${plan_name} Membership Invoice. Expiry: ${expiryDate}`,
    line_items: [
      {
        name: plan_name,
        description: `Membership valid until ${expiryDate}`,
        amount: amount,
        currency: currency,
        quantity: 1
      }
    ],
    customer: {
      name: customer_name,
      email: customer_email
    },
    reminder_enable: true,
    options: {
      checkout: {
        name: 'MY FITNESS',
        description: `${plan_name} Membership`,
        prefill: {
          email: customer_email,
          contact: ''
        },
        theme: {
          color: '#ff6b6b'
        }
      }
    }
  };

  try {
    const invoice = await razorpay.invoices.create(invoiceData);
    res.json({ 
      success: true, 
      invoice: invoice,
      payment_link: invoice.short_url, // <-- This is the payment link
      message: 'Invoice created successfully' 
    });
  } catch (err) {
    console.error('Error creating invoice:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get invoice by ID
app.get('/api/invoice/:invoiceId', async (req, res) => {
  try {
    const invoice = await razorpay.invoices.fetch(req.params.invoiceId);
    res.json({ success: true, invoice });
  } catch (err) {
    console.error('Error fetching invoice:', err);
    res.status(500).json({ error: err.message });
  }
});

// Test invoice creation endpoint
app.post('/api/test-invoice', async (req, res) => {
  try {
    console.log('Testing invoice creation...');
    
    const testInvoice = await razorpay.invoices.create({
      type: 'invoice',
      date: Math.floor(Date.now() / 1000),
      currency: 'INR',
      description: 'Test Membership Invoice',
      line_items: [
        {
          name: 'Test Plan',
          description: 'Test Membership Plan',
          amount: 10000, // ₹100 in paise
          currency: 'INR',
          quantity: 1
        }
      ],
      customer: {
        name: 'Test User',
        email: 'test@example.com'
      },
      notify_by: 'email',
      reminder_enable: true
    });
    
    console.log('Test invoice created:', testInvoice);
    res.json({ 
      success: true, 
      invoice: testInvoice,
      message: 'Test invoice created successfully' 
    });
  } catch (err) {
    console.error('Test invoice creation failed:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
