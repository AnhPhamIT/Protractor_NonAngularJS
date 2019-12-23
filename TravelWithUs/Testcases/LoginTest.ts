import { LoginPage } from "../PageObjects/LoginPage";
import { browser } from "protractor";
import { dataBuilder } from "../../core_function/databuilder";
import { AlertHandling } from "../Common/AlertHandling";

describe("Login page ", function(){
    var loginPage:LoginPage
    var originalTimeout:number;
    var dataArray:Array<Map<string,string>>
    var alertHandling:AlertHandling

    beforeEach(async function(){
        // await browser.restart()
        loginPage = new LoginPage(browser)
        alertHandling = new AlertHandling(browser)
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

    })

    it("should welcome user when login with valid account", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Login.xlsx", "Login", "TC01")
        console.log("STEP 1: Login to the website http://23.96.32.200/index.php")
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(browser.params.appURL)
        var email=dataArray[0].get("Email")
        var password=dataArray[0].get("Password")

        await loginPage.loginToWebsite(email, password)
        
        console.log("STEP 2: Verify login function")
        await loginPage.verifyLoginSuccess(email)

    })

    it("should show error message 'There is no user record corresponding to this identifier. The user may have been deleted.' when login with invalid account", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Login.xlsx", "Login", "TC02")
        console.log("STEP 1: Login to the website with invalid account")
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(browser.params.appURL)  

        var email=dataArray[0].get("Email")
        var password=dataArray[0].get("Password")

        await loginPage.loginToWebsite(email, password)
        
        console.log("STEP 2: Verify alert message and then dismiss")
        await alertHandling.verifyAndAcceptAlert("There is no user record corresponding to this identifier. The user may have been deleted. FAILED CASE")

    })

    it("should validate email and password if leaving it as blank", async function(){ 

        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Login.xlsx", "Login", "TC03")
        //await validateEmailPasswordLoop(dataArray)
        for (const item of dataArray) {
            await validateEmailPassword(item.get("Email"), item.get("Password"))    
        }
    })

    // async function validateEmailPasswordLoop(dataArr:Array<Map<string, string>>){
    //     for (const item of dataArray) {
    //         await validateEmailPassword(item)    
    //     }
    // }

    async function validateEmailPassword(email:string, password:string){
        console.log("STEP 1: Login to the website with blank username and password")
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(browser.params.appURL)  

        console.log("STEP1: Login to the website with email " + email + " and password " + password)
        await loginPage.loginToWebsite(email, password)
        
        console.log("STEP 2: Email and password should be validated")
        await loginPage.verifyLoginWithBlankUserPassword(email, password)
    }

    afterEach(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })
});
