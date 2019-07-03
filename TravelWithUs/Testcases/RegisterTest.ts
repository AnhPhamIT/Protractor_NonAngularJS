import { LoginPage } from "../PageObjects/LoginPage";
import { RegisterPage } from "../PageObjects/RegisterPage";
import { browser } from "protractor";
import { dataBuilder } from "../../core_function/databuilder";
import { AlertHandling } from "../Common/AlertHandling";
import { ConfirmEmail } from "../Common/ConfirmEmail";

describe("User ",function(){
    var registerPage:RegisterPage
    var loginPage:LoginPage
    var dataArray
    var originalTimeout:number
    var alertHandling:AlertHandling
    var confirmEmail:ConfirmEmail

    beforeEach(function(){
        debugger
        registerPage = new RegisterPage(browser)
        loginPage=new LoginPage(browser)
        alertHandling = new AlertHandling(browser)
        confirmEmail = new ConfirmEmail(browser)

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
    })

    it("can register successfully", async function(){
        debugger
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Login.xlsx", "Register", "TC03")
        browser.waitForAngularEnabled(false)
        debugger
        browser.get("http://travelwithus.asia/")
        debugger
        browser.manage().window().maximize()
        debugger

        var email=dataArray[0].get("Email")
        var password=dataArray[0].get("Password")
        debugger
        console.log("STEP 1: Register a new account")
        await registerPage.fillInformationForRegisterForm(dataArray[0])

        var loginSucceedMsg="Congratulations! Welcome to our trips. A Validation email has been sent to "+email+", please check your inbox."
        await alertHandling.verifyAndAcceptAlert(loginSucceedMsg)
        
        console.log("STEP 2: Verify if login success")
        await confirmEmail.verifyConfirmEmail(email)
        debugger
        await loginPage.loginToWebsite(email, password)

        await loginPage.verifyLoginSuccess(email)
        
    })

    afterEach(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })
})