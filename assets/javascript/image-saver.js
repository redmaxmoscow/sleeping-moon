const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function doScreenshot(page) {
    await sleep(1000).then(async ()=> {
        await page.screenshot({ path: '/home/redmaxmsk/Pictures/Wallpapers/wallpaper.jpeg',  type: 'jpeg', quality: 90}).then(async ()=> {
            await doScreenshot(page);
        });
    });
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
    });
    await page.goto('http://localhost/sleepin-moon-wallpaper/');
    await doScreenshot(page);

    await browser.close();
})();
