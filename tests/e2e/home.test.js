const { Builder, By } = require('selenium-webdriver');

jest.setTimeout(30000);

describe('Home Page', () => {
    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser('chrome')
            .usingServer(process.env.SELENIUM_REMOTE_URL)
            .build();
    });

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    test('should display the correct heading', async () => {
        await driver.get(process.env.APP_URL);

        const heading = await driver.findElement(By.css('h1'));
        const text = await heading.getText();

        expect(text).toBe('Welcome to CI/CD');
    });
});