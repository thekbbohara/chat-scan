import puppeteer from "puppeteer";

const scrapeLiveYTUrl = async (url: string) => {
  if (!url) throw new Error("Undefined url");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Look for the "Live" section
  const liveStream = await page.evaluate(() => {
    const liveElement: HTMLAnchorElement | null =
      document.querySelector('a[href*="watch"]');
    if (!liveElement) return null;
    return liveElement?.getAttribute("href");
  });
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Waited for 5 sec..");
    }, 5000);
  });
  if (liveStream) {
    console.log("Live Stream URL:", liveStream);
  } else {
    console.log("No live stream detected.");
  }

  await browser.close();
};
