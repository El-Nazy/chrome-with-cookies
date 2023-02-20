const puppeteer = require('puppeteer-core');
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", // Replace with the path to your Chrome/Chromium executable
    headless: false, // Set to false to see the browser window
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Read cookies from a file
  const cookieData = fs.readFileSync("./cookies.txt", "utf8");
  const cookies = cookieData
    .trim()
    .split("\n")
    .map((line) => {
      const [domain, flag1, path, flag2, expires, name, value] =
        line.split("\t");
      return {
        domain,
        path,
        expires,
        name,
        value,
        httpOnly: flag1 === "TRUE",
        secure: flag2 === "TRUE",
      };
    });

  // Attach cookies to the page
  await page.setCookie(...cookies);
  
//   // Navigate to a website
//   await page.goto("https://www.example.com");

//   // Do something with the page
//   // ...

//   await browser.close();
})();
