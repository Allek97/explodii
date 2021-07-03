const nodemailer = require("nodemailer");
const expressHbs = require("nodemailer-express-handlebars");
const fs = require("fs");
const path = require("path");
const htmlToText = require("html-to-text");
const hb = require("handlebars");
// const pug = require("pug");

// require("express-handlebars").create({
//     layoutsDir: path.join(__dirname, "views/hbs"),
//     defaultLayout: "main",
// });

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        this.url = url;
        this.from = `Ilias Allek <${process.env.EMAIL_FROM}>`;
    }

    transport() {
        // SendGrid uniquement dans la production
        if (process.env.NODE_ENV === "production") {
            // Sendgrid
            return nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // Send the actual email
    async send(fileName, content) {
        // NOTE: Regler ce probleme avec nodemailer-express
        // eslint-disable-next-line global-require
        // require("express-handlebars").create({
        //     layoutsDir: path.join(__dirname, "views/hbs"),
        //     defaultLayout: "main",
        // });
        // transport.use(
        //     "compile",
        //     expressHbs({
        //         viewPath: `views/hbs`,
        //         extName: ".hbs",
        //     })
        // );
        // transport.use("compile", expressHbs());
        // const compiledTemplate = hb.compile(templateContent.toString());

        const hbsLink = `views/hbs/${fileName}.hbs`;
        const source = fs.readFileSync(hbsLink, "utf-8").toString();

        const templateContent = hb.compile(source);

        // On va remplacer les variables dans les hbs files
        const replacements = {
            FirstName: this.firstName,
            CompanyName: "Explodii",
            Link: `${process.env.CLIENT_URL}/`,
            ContactEmail: process.env.EMAIL_FROM,
        };

        const htmlToSend = templateContent(replacements);

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: content,
            html: htmlToSend,
            // text: htmlToText.fromString(templateContent), // NOTE: Only in dev mode
            attachments: [
                {
                    filename: "mountain.png",
                    path:
                        "https://explodii.s3.us-east-2.amazonaws.com/mountain.png",
                    cid: "mountain",
                },
                {
                    filename: "tour-3-2-600x400.jpg",
                    path:
                        "https://explodii.s3.us-east-2.amazonaws.com/tour-3-2-600x400.jpg",
                    cid: "tour-3-2-600x400",
                },
            ],
        };

        // transport.use("compile", expressHbs(mailOptions));

        await this.transport().sendMail(mailOptions);
    }

    async sendPasswordResetRequest() {
        await this.send(
            "resetPassword",
            "Your password reset token (valid for only 10 minutes)"
        );
    }

    async sendRegistration() {
        await this.send(
            "registration",
            "Thank you for joining the Explodii service!"
        );
    }
};
