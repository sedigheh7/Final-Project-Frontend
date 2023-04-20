import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
dotenv.config()


async function sendMail() {
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:456,
        secure:true,
        auth: {
            user:'sedigheh.asgarifard@hicoders.ch',
            pass:'fxugzcezcftrueia'
        }
    })

const info = await transporter.sendMail({
    from:'sedigheh.asgarifard@hicoders.ch',
    to:'sahar.asgarifard@gmail.com',
    subject:'Hello',
    text:'hello world',
    html:'<b>hello world<b>'
})
console.log(`message sent: ${info.messageId}`)
}

async function main() {
    await sendMail()
}
main()
