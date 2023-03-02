const {Before, Given, When, Then, After, setDefaultTimeout} = require('@cucumber/cucumber');

var assert = require('assert');
var wd = require("selenium-webdriver");
var By = wd.By;
var until = wd.until;

let driver;

//Set APK
var desiredCaps = {
    platformName: "Android",
    app: "C:/Projects/Appium-Cucumber-Test/file.apk",
    browserName: '';
};

//Override default timeout
setDefaultTimeout(100 * 1000);

//Before Cucumber tag, initialise driver
Before(async function () {
    console.log("Initialise driver"); 
    
    try {
        driver = await new wd.Builder().usingServer("http://localhost:8080/wd/hub").withCapabilities(desiredCaps).build();
    
        console.log("Driver initialised!");  
    } catch (e) {
        //Catch and print exceptions
        console.log(e); 
    }
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
        console.log(e);
    }  
});

//When Cucumber tag, select the login button     
When(/^I click the login button$/, async () => {  
    try {
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
        //Wait for a logout button on page
        await driver.wait(until.elementLocated(By.id("logout"), 5000));
        //Check for logout elements on page
        var logout = await driver.findElements(By.id("logout"));
        //Assert more than 0 elements are present
        assert.notEqual(logout.length, 0);
    
        console.log("Logout button/s present!");  
    } catch (e) {
        console.log(e);
    }
});

//After Cucumber tag, release driver instance
After(async function() {
    console.log("Close driver");
    
    try {
        await driver.quit();
    
        console.log("Driver has been closed!"); 
    } catch (e) {
        console.log(e);
    }
  })
