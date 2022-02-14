const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        const page = await browser.newPage();
        await page.goto('https://pro.ford.com/en-us/');
        await page.waitForSelector('#header-menu', { timeout: 10000000 });

        const body = await page.evaluate(() => {
            return document.querySelector('body').innerHTML;
        });
        console.log(body);

        fs.writeFile('./output_file.html', body, err => {
            if (err) {
                console.error(err)
                return;
            }
        });

        await browser.close();
    } catch (error) {
        console.log('error: ', error);
    }
})();
