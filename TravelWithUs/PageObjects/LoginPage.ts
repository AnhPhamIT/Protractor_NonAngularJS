import { ActionSupport } from '../../core_function/actionSupport/actionSupport';
import { HomePage } from './HomePage';
import { by, element, ProtractorBrowser } from 'protractor';

export class LoginPage{

    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser
    homepage:HomePage
    
    email_txt:string
    password_txt:string
    
    signIn_lnk: string
    login_btn:string
    register_btn:string
    cancel_btn:string

    forgotPassword_lnk:string

    constructor(browser:any){
        console.log("Initialize all elements in LoginPage")
        this.curBrowser = browser
        // create instance
        this.actionSupport = new ActionSupport(this.curBrowser)        
        this.homepage = new HomePage(this.curBrowser)

        // define xpath for elements

        this.email_txt="//input[@id='email']"
        this.password_txt ="//input[@id='pwd']"

        this.login_btn ="//button[text()='Login']"
        this.register_btn="//button[text()='Register']"
        this.cancel_btn="//button[text()='Cancel']"
        this.register_btn="//button[text()='Register']"

        this.signIn_lnk = "//a[normalize-space()='Sign In']"
        this.forgotPassword_lnk="//a[text()='Forgot password?']"
    }

    async loginToWebsite(email:string, password:string){
        console.log("LoginPage: Login to the website")
        await this.actionSupport.clickOnElement(this.signIn_lnk)
        console.log("LoginPage: Input email " + email)
        await this.actionSupport.sendKeysOnElement(this.email_txt, email)
        console.log("LoginPage: Input password " + password)
        await this.actionSupport.sendKeysOnElement(this.password_txt, password)
        
        console.log(this.login_btn)
        await this.actionSupport.clickOnElement(this.login_btn)
    }

    async verifyLoginSuccess(email:string){
        var xpath=this.homepage.getWelcome_lbl(email)

        console.log("LoginPage: waiting for element " + xpath + " is displayed")
        await this.actionSupport.waitForElementDisplay(xpath)
        
        console.log("LoginPage: verify if element display on screen")
        var welcome_ele = await this.curBrowser.element(by.xpath(xpath)).isDisplayed()
        await expect(welcome_ele).toBe(true);
    }

    async verifyLoginWithBlankUserPassword (email:string, password:string){

        if(email.toString()==""){
            console.log("LoginPage: Placeholder attribute should be empty (focused) when email blank")
            await expect(this.actionSupport.getElementAttribute(this.email_txt,"placeholder")).toEqual("")
        }else if(password.toString()==""){
            console.log("LoginPage: Placeholder attribute should be empty (focused) when password blank")
            await expect(this.actionSupport.getElementAttribute(this.password_txt,"placeholder")).toEqual("")
        }
        
    }

}