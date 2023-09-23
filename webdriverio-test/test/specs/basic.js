/** @format */

const { Given, When, Then } = require("cucumber");
const { remote } = require("webdriverio");
const { expect } = require("chai");

let browser;

Before(async () => {
  browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
  });
});

After(async () => {
  await browser.deleteSession();
});

Given("User is located on the main page of saucedemo website", async () => {
  await browser.url("https://www.saucedemo.com");
});

When('User clicks "Login" button', async () => {
  const loginButton = await browser.$("#login-button");
  await loginButton.click();
});

Then(
  'User should see "Epic sadface: Username is required" error message',
  async () => {
    const errorMessage = await browser.$(".error-message-container");
    const errorText = await errorMessage.getText();
    expect(errorText).to.include("Epic sadface: Username is required");
  }
);
