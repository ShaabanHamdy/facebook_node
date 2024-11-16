import nodemailer from 'nodemailer'



const sendEmail = async ({
    to = '',
    message = '',
    subject = '',
    attachments = []
}) => {
    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 587,
        secure: false,
        service: "gmail",
        auth: {
            // user: process.env.USER,
            // pass: process.env.PASS
            user: "shabanhamdy94@gmail.com",
            pass: "kxoc kvip witp vfyw",

        }
    })
    const info = await transporter.sendMail({
        from: process.env.USER,
        to,
        html: message,
        subject,
        attachments
    })
    return info.rejected.length ? false : true
}

export default sendEmail