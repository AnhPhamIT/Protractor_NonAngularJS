import {ProtractorBrowser} from 'protractor'
import { ActionSupport } from '../../core_function/actionSupport/actionSupport';
import { LoginPage } from './LoginPage';
import { ConfirmEmail } from '../Common/ConfirmEmail';

export class RegisterPage{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser
    loginPage:LoginPage
    confirmEmail:ConfirmEmail

    //define elements
    firstName_txt:string
    lastName_txt:string
    Gender_cb:string
    email_txt:string
    contactNumber_txt:string
    password_txt:string
    confirmPassword_txt:string
    submit_btn:string

    constructor(browser:ProtractorBrowser){
        this.curBrowser = browser
        this.actionSupport=new ActionSupport(this.curBrowser)
        this.loginPage = new LoginPage(this.curBrowser)
        this.confirmEmail = new ConfirmEmail(this.curBrowser)

        this.firstName_txt ="//input[@name='fname']"
        this.lastName_txt="//input[@name='lname']"
        this.email_txt="//input[@name='email']"
        this.contactNumber_txt="//input[@name='phone']"
        this.password_txt="//input[@id='inputPassword']"
        this.confirmPassword_txt="//input[@id='inputPasswordConfirm']"

        this.submit_btn="//div[@class='form-group']/button[text()='Submit']"

    }
    getGender_cb(gender:string):string{
        return "//input[@name='inlineRadioOptions'][@id='"+ gender.toLowerCase() +"']"
    }

    async fillInformationForRegisterForm(map:Map<string, string>){
        console.log("Fill information for Register form")
        await this.actionSupport.clickOnElement(this.loginPage.signIn_lnk)
        await this.actionSupport.clickOnElement(this.loginPage.register_btn)
        await this.actionSupport.sendKeysOnElement(this.firstName_txt,map.get("FirstName"))
        await this.actionSupport.sendKeysOnElement(this.lastName_txt, map.get("LastName"))

        await this.actionSupport.clickOnElement(this.getGender_cb(map.get("Gender")))
        await this.actionSupport.sendKeysOnElement(this.email_txt,map.get("Email"))
        await this.actionSupport.sendKeysOnElement(this.contactNumber_txt, map.get("ContactNumber"))
        await this.actionSupport.sendKeysOnElement(this.password_txt,map.get("Password"))
        await this.actionSupport.sendKeysOnElement(this.confirmPassword_txt,map.get("ConfirmPassword"))

        await this.actionSupport.clickOnElement(this.submit_btn)
    }


    async verifyConSuccessful(email:string){
        await this.confirmEmail.verifyConfirmEmail(email)
    }
}