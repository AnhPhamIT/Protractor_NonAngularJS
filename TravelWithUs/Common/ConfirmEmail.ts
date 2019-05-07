import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser, element, by } from "protractor";

export class ConfirmEmail{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser

    confirmEmail:string
    confirmLink:string
    go_btn:string
    tmp:string

    constructor(browser:any){
        this.curBrowser= browser.forkNewDriverInstance()
        this.actionSupport=new ActionSupport(this.curBrowser)
        this.confirmEmail="//td[contains(text(),'noreply@travelwithus')]"
        this.confirmLink="//a[contains(text(),'https://travelwithus')]"
        this.go_btn="//button[text()='Go!']"
        this.tmp="//p[contains(text(),'Follow this link to verify your email address.')]"
    }

    async verifyConfirmEmail(email:string){
        var partialEmail=(email.split('@'))[0]
        
        var emailURL="https://www.mailinator.com/v3/index.jsp?zone=public&query=" + partialEmail +"#/#inboxpane"
        
        this.curBrowser.waitForAngularEnabled(false)
        this.curBrowser.manage().window().maximize()
        console.log("ConfirmEmail: Navigate to this link " + emailURL)
        await this.curBrowser.get(emailURL)
        //search for the tittle ""
        await this.curBrowser.sleep(3000)
        await this.actionSupport.clickOnElement(this.go_btn)
        console.log("ConfirmEmail: Click on confirm Email")
        await this.actionSupport.clickOnElement(this.confirmEmail)    
        
        console.log("ConfirmEmail: switch to iframe")
        //await this.curBrowser.switchTo().frame(element(by.xpath("//iframe[@id='msg_body']")).getWebElement())
        //await this.curBrowser.switchTo().frame(1)
        await this.curBrowser.switchTo().frame(this.curBrowser.findElement(by.xpath("//iframe[@id='msg_body']")))    

        await this.curBrowser.sleep(3000)
        expect(this.curBrowser.element(by.xpath(this.tmp)).getText()).toEqual("Follow this link to verify your email address.")
        console.log("ConfirmEmail: Click on the confirm Link")
        await this.actionSupport.clickOnElement(this.confirmLink)
        
    }


}