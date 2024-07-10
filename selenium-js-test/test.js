const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

async function takeScreenshot(driver, filename) {
    let image = await driver.takeScreenshot();
    fs.writeFileSync(filename, image, 'base64');
}

async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Go to Kurtosys home page
        await driver.get('https://www.kurtosys.com/');
        console.log('Navigated to Kurtosys website');
        await takeScreenshot(driver, '1_homepage.png');

        await driver.wait(until.elementLocated(By.id('onetrust-accept-btn-handler')), 20000);

        // Dismiss the consent overlay
        try {
            let dismissButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('onetrust-accept-btn-handler'))), 10000);
            await dismissButton.click();
            console.log('Dismissed consent overlay');
            await takeScreenshot(driver, '2_dismissed_consent.png');
        } catch (error) {
            console.log('Consent overlay not found or already dismissed');
        }

        // Navigating to White Papers & eBooks
        try {
            let whitePapersEbooksLink = await driver.wait(until.elementIsVisible(driver.findElement(By.linkText('White Papers & eBooks'))), 10000);
            await whitePapersEbooksLink.click();
            console.log('Clicked on White Papers & eBooks');
            await takeScreenshot(driver, '3_clicked_whitepapers.png');

            try {
                let ucitsWhitepaperLink = await driver.wait(until.elementIsVisible(driver.findElement(By.linkText('UCITS Whitepaper'))), 10000);
                await ucitsWhitepaperLink.click();
                console.log('Clicked on UCITS Whitepaper');
                await takeScreenshot(driver, '4_clicked_ucits.png');

                // UCITS Whitepaper page to load
                await driver.wait(until.urlContains('/white-papers/eu-rule-change-bolsters-need-for-fast-localized-fund-website-platforms-2/'), 20000);
                console.log('Successfully loaded UCITS Whitepaper page');
                await takeScreenshot(driver, '5_loaded_ucits.png');

            } catch (error) {
                console.log('Timed out waiting for UCITS Whitepaper link to be clickable');
            }

        } catch (error) {
            console.log('Timed out waiting for White Papers & eBooks link to be clickable');
        }

        // Verify Page URL
        const expectedUrl = 'https://www.kurtosys.com/white-papers-ebooks';
        try {
            await driver.wait(until.urlIs(expectedUrl), 10000);
            let currentUrl = await driver.getCurrentUrl();
            if (currentUrl === expectedUrl) {
                console.log('Successfully verified URL for White Papers & eBooks page');
                await takeScreenshot(driver, '6_verified_url.png');
            } else {
                console.log(`Expected URL '${expectedUrl}', but got '${currentUrl}'`);
            }
        } catch (error) {
            let currentUrl = await driver.getCurrentUrl();
            console.log(`Timed out waiting for URL to be '${expectedUrl}', current URL: '${currentUrl}'`);
        }

    } finally {
        await driver.quit();
        console.log('Closed the WebDriver');
    }
}

runTest();
