const nodemailer = require('nodemailer');


async function sendemail(){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'deshstephen@gmail.com',
            pass: 'desh.stephen01'
        }
    });

    let emailInfo = await transporter.sendMail({
        from: '"dephen" <deshstephen@gmail.com>',
        to: 'deshspo@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
        });

    let info = transporter.sendMail(emailInfo, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
        });
}

sendemail()

