import puppeteer from "puppeteer";
async function printPDF(postId) {
    const browser = await puppeteer.launch({ headless: true });/// Puppeteer launches the
    // Chromium browser in headless mode, which means that the browser runs in the background
    // without displaying any graphical user interface (GUI).
    const page = await browser.newPage();///create a new page
    await page.goto(`http://localhost:3000/post/${postId}`, { waitUntil: 'networkidle0' });
    //go to the selected post
    const pdf = await page.pdf({ format: 'A4' }); ///generate PDF
    await browser.close(); //close the browser
    return pdf;
    }

    export default printPDF