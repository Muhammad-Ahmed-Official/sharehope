import { NGO_Registration_Template, Donor_Donation_Template } from '@/app/email/EmailTemplate';
import nodemailer from 'nodemailer';

const emailConfig = {
    service: "gmail",
    auth: {
        user: process.env.PORTAL_EMAIL,
        pass: process.env.PORTAL_PASSWORD,
    },
};

async function sendEmailNgo(mail:string, ngoName: string) {
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail, 
        subject: "NGO Registration",
        html: NGO_Registration_Template(ngoName), 
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: `Email sent to ${mail} via email`,
        };
    } catch (error) {
        return {
            success: false,
            message: `Error sending OTP to ${mail} via email: ${error}`,
        };
    }
}



async function sendEmailDonar(mail:string, donorName: string, ngoName: string, amount: number) { 
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
        from: process.env.PORTAL_EMAIL,
        to: mail, 
        subject: "Donation",
        html: Donor_Donation_Template(donorName, ngoName, amount), // html body 
    };

    try {
        await transporter.sendMail(mailOptions);
        return `Donation Email sent to ${mail} via email`;
    } catch (error) {
        throw `Error sending email to ${mail} via email: ${error}`;
    }
}

export { sendEmailNgo, sendEmailDonar }