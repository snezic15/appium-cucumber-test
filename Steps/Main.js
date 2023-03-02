const {Before, Given, When, Then, After, setDefaultTimeout} = require('@cucumber/cucumber');

var assert = require('assert');
var wd = require("selenium-webdriver");
var By = wd.By;
var until = wd.until;

let driver;

//Set fake testing APK package
var capabilities = {
    platformName: "Android",
    app: "C:/Projects/Appium-Cucumber-Test/file.apk",
    browserName: '';
};

//Override default timeout
setDefaultTimeout(100 * 1000);

//Before Cucumber tag, initialise driver
Before(async function () {
    console.log("Initialise driver"); 
    driver = await new wd.Builder().usingServer("http://localhost:8080/wd/hub").withCapabilities(capabilities).build();
    console.log("Driver initialised!");  
})

//Given Cucumber tag, login credentials
Given(/^I input my credentials$/, async () => {
    try {
    //Input username
    const username = await driver.findElement(By.id("username"));
    await username.sendKeys("admin");
    
    //Input password
    const password = await driver.findElement(By.id("password"));
    await password.sendKeys("admin");
    
    console.log("Credentials Inputted!")
    } catch (e) { 
        //Catch and print exceptions
        console.log(e);
    }  
});

//When Cucumber tag, select the login button     
When(/^I click the login button$/, async () => {  
    try {
        //Find and click login button
        const login = await driver.findElement(By.id("login"));
        await login.click();   
        
        console.log("Login Button Complete!")
    } catch (e) {
        console.log(e);
    }
}); 

//Then Cucumber tag, verify login is completed
Then(/^I confirm I have logged in successfully$/, async () => {
    try {
        //Wait status message ID to be present on page reload after login
        await driver.wait(until.elementLocated(By.id("status_message"), 5000));
        //Find status message ID
        var statusMessage = await driver.findElement(By.id("status_message"));
        //Assert user has logged in by confirming login message
        assert.equal(statusMessage.getAttribute(“text”).toLowerCase(), "logged in");
    
        console.log("User has confirmed login!");  
    } catch (e) {
        console.log(e);
    }
});

//Second Then Cucumber tag, logout
Then(/^I log out of the account successfully$/, async () => {
    try {
        //Find and click logout button
        const logout = await driver.findElement(By.id("logout"));
        await logout.click();  
        
        //Wait for a logout, find login button on page
        await driver.wait(until.elementLocated(By.id("login"), 5000));
        //Check for login button elements on page
        var login = await driver.findElements(By.id("login"));
        //Assert more than 0 elements are present
        assert.notEqual(login.length, 0);
    
        console.log("Logout complete! Successfully found login button!");  
    } catch (e) {
        console.log(e);
    }
});

//After Cucumber tag, release driver instance
After(async function() {
    console.log("Close driver");
    await driver.quit();
    console.log("Driver has been closed!"); 
  })
