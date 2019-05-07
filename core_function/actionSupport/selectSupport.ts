import { element, by, ElementFinder,ProtractorBrowser } from "protractor";
import { ActionSupport } from "./actionSupport";

export class SelectSupport{
    ddl:string
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser
    constructor(ddl_xpath:string, browser:ProtractorBrowser){
        this.curBrowser = browser
        this.actionSupport  = new ActionSupport(this.curBrowser)
        this.ddl= ddl_xpath
    }

    async selectByIndex(index:number){
        index+=1
        var xpath= this.ddl +"/option["+index+"]"
        await this.actionSupport.clickOnElement(this.ddl)
        await this.actionSupport.clickOnElement(xpath)
    }

    async selectByValue(value:string){
        var xpath= this.ddl +"/option[@value='"+value+"']"
        await this.actionSupport.clickOnElement(this.ddl)
        await this.actionSupport.clickOnElement(xpath)
    }

    async selectByVisibleText(text:string){
        var xpath= this.ddl +"/option[text()='"+text+"']"
        await this.actionSupport.clickOnElement(this.ddl)
        await this.actionSupport.clickOnElement(xpath)
    }

    getOptions(){

    }

    getSelectedOption(){
        
    }

    isMultiple(){

    }
}