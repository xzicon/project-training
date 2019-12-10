const nodemailer = require('nodemailer');
const config = {
	host:'smtp.qq.com',
	port:465,
	auth:{
		user:'2627405095@qq.com',
		pass:'vcodtzrjwhltdihe'
	}
};
const transporter = nodemailer.createTransport(config);
module.exports = function(mail){
	transporter.sendMail(mail,function(error,info){
		if(error){
			return console.log(error);
		}else{
			console.log('mail sent',info.response)
		}
	})
}
