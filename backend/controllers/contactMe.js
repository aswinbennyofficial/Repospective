const axios = require('axios');

async function contactMe(emailID, emailSubject, emailBody) {
    // Retrieve API key and admin email from environment variables
    const API_KEY = process.env.BREVO_API;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    // Define the email payload
    const emailData = {
        sender: {
            name: "Repospective",
            email: ADMIN_EMAIL
        },
        to: [
            {
                email: ADMIN_EMAIL
            }
        ],
        subject: emailSubject,
        htmlContent: `Email ID: ${emailID}<br/>Content: ${emailBody}`
    };

    // API endpoint for sending email
    const API_URL = 'https://api.brevo.com/v3/smtp/email';

    // Axios configuration for the request
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY
        }
    };

    try {
        // Send POST request to Brevo API to send email
        const response = await axios.post(API_URL, emailData, config);
        console.log('Email sent successfully:', response.data);
        return 'success';
    } catch (error) {
        console.error('Error sending email:', error);
        // Here you can handle errors, such as logging or returning an error response
        throw new Error('Failed to send email');
    }
}

module.exports = {
    contactMe
};
