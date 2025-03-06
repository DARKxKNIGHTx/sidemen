import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Ethereal Email test credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'yh3g7wbeaco3yvwn@ethereal.email',
    pass: 'yRJkgS6G6mYUEAc7qT'
  },
  debug: true // Enable debug logs
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('SMTP Server is ready to send messages');
  }
});

export async function POST(request: Request) {
  try {
    const { deviceName, deviceIP, deviceMAC, userEmail } = await request.json();
    
    console.log('Attempting to send email with details:', {
      deviceName,
      deviceIP,
      deviceMAC,
      userEmail
    });

    // Send email
    const info = await transporter.sendMail({
      from: '"Sidemen Security" <security@sidemen.com>',
      to: userEmail,
      subject: "⚠️ Security Alert: Suspicious Activity Detected",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Security Alert</h1>
          <p>Suspicious activity has been detected on your network.</p>
          
          <h2>Device Details:</h2>
          <ul>
            <li><strong>Device Name:</strong> ${deviceName}</li>
            <li><strong>IP Address:</strong> ${deviceIP}</li>
            <li><strong>MAC Address:</strong> ${deviceMAC}</li>
          </ul>
          
          <p style="color: #dc2626; font-weight: bold;">
            This device has been flagged for suspicious activity and requires immediate attention.
          </p>
          
          <p>Recommended Actions:</p>
          <ol>
            <li>Isolate the device from your network</li>
            <li>Run a security scan</li>
            <li>Check for unauthorized access</li>
            <li>Update device firmware if available</li>
          </ol>
          
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This is an automated message from Sidemen Security. Please do not reply to this email.
          </p>
        </div>
      `,
      text: `
        Security Alert
        
        Suspicious activity has been detected on your network.
        
        Device Details:
        - Device Name: ${deviceName}
        - IP Address: ${deviceIP}
        - MAC Address: ${deviceMAC}
        
        This device has been flagged for suspicious activity and requires immediate attention.
        
        Recommended Actions:
        1. Isolate the device from your network
        2. Run a security scan
        3. Check for unauthorized access
        4. Update device firmware if available
        
        This is an automated message from Sidemen Security. Please do not reply to this email.
      `
    });

    console.log('Email sent successfully:', {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    });

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error) {
    console.error('Detailed error sending alert:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send security alert',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 