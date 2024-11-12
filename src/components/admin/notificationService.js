// components/admin/notificationService.js
export const createNotification = async (memberId, memberEmail, dueDate) => {
    try {
      const response = await fetch('http://localhost:5000/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: memberEmail,
          subject: 'Gym Membership Expiry Reminder',
          text: `Dear member, your gym membership will expire in X days. Please renew to continue enjoying our facilities.`,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
  
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error in sending notification:', error);
    }
  };
  