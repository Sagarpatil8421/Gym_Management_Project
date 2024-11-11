// backend/server.js
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
