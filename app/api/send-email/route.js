import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const body = await request.json();
    const { from, subject, text } = body;
    
    const messageBody = `From: ${from}\n\n${text}`;
    
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL, 
      to: process.env.RESEND_TO_EMAIL,       
      subject: `${subject} - Contact from ${from}`, 
      text: messageBody, 
    });
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
