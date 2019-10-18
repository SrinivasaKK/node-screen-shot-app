const puppeteer = require("puppeteer");

async function takeScreenShot() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-infobars", // Removes the butter bar.
      "--start-maximized"
      // '--start-fullscreen',
      // '--window-size=1920,1080',
      // '--kiosk',
    ]
  });
  const newPage = await browser.newPage();
  await newPage.setViewport({ width: 1920, height: 1080 });
  await newPage.goto("https://google.com", {
    waitUntil: ["load", "networkidle2"]
  });
  await newPage.evaluate("document.documentElement.webkitRequestFullscreen()");
  await newPage.waitFor(5000);
  const buffer = await newPage.screenshot({
    path: "./screenshot.png"
  });

  await newPage.close();
  await browser.close();
}

takeScreenShot()
  .then(() => {
    console.log("Screenshot taken successfully!");
  })
  .catch(err => {
    console.log("Error occured");
    console.dir(err);
  });
