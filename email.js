var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deshstephen@gmail.com',
    pass: 'desh.stephen01'
  }
});

var emailInfo = {
    from: 'deshstephen@gmail.com',
    to: 'deshspo@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
    };

    let info = transporter.sendMail(emailInfo, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
    