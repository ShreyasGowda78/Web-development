import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: { 
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
export default transporter;


