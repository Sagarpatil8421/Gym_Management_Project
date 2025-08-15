// Payment service for Razorpay integration
const BACKEND_URL = 'http://localhost:5000'; // Change this to your backend URL

export const createInvoice = async (amount, customerName, customerEmail, planName, planMonths) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/create-invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        customer_name: customerName,
        customer_email: customerEmail,
        plan_name: planName,
        plan_months: planMonths, // <-- Make sure this is sent!
        description: `${planName} Membership Invoice`
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

export const getInvoice = async (invoiceId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/invoice/${invoiceId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch invoice');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
};
