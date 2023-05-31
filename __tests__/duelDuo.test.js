const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });
  test("page click's draw", async () => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id("draw")).click();
    const choicesDisplayed = await driver.findElement(By.id("choices")).isDisplayed();
    expect(choicesDisplayed).toBe(true)
  });
  test("page click's draw", async () => {
    await driver.get("http://localhost:8000");
    await driver.findElement(By.id("draw")).click();
    await driver.findElement(By.className("bot-btn")).click();
    const playerDuoDisplayed = await driver.findElement(By.id("player-duo")).isDisplayed();
    expect(playerDuoDisplayed).toBe(true)
  });
});