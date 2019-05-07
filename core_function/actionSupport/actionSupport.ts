import {by, protractor, ProtractorBrowser, ProtractorExpectedConditions, ElementFinder} from 'protractor'
import { debug } from 'util';

export class ActionSupport{
    curBrowser:ProtractorBrowser
    timeOut:number
    until:ProtractorExpectedConditions

    constructor(browser, timeOut=60000){
        this.curBrowser=browser
        this.timeOut =timeOut
        this.until = protractor.ExpectedConditions
    }

    async clickOnElement(xpath:string, timeout=this.timeOut){
        console.log("Clicking on element " + xpath)
        var ele= await this.curBrowser.element(by.xpath(xpath))
        await this.curBrowser.wait(this.until.presenceOf(ele),timeout, 'Element ' + xpath +' takes too long to appear in the DOM')
        await this.curBrowser.wait(this.until.elementToBeClickable(ele), this.timeOut, 'Element ' + xpath +' is NOT clickable')
        await ele.click()

    }

    async sendKeysOnElement(xpath:string, data:string, timeOut=this.timeOut) {
        console.log("Sending key to element " + xpath)
        var ele:ElementFinder = await this.curBrowser.element(by.xpath(xpath));
        await this.curBrowser.wait(this.until.presenceOf(ele), timeOut, 'Element ' + xpath +' takes too long to appear in the DOM');
        await this.curBrowser.wait(this.until.elementToBeClickable(ele), timeOut, 'Element '+ xpath +' is not interactable');
        var textLength:number
        try {
            await ele.clear()
            for(var i = 0; i < data.length; i++){
                await this.sendSingleKey(ele, data, i)
            }   
            await this.getElementAttribute(xpath,"value").then(function(value){
                console.log("Text length: " + value.length)
                textLength= value.length
            }) 
            if(textLength!=data.length){
                throw new Error("Sendkeys does not send full text string")
            }

        } catch (error) {
            await ele.clear()
            for(var i = 0; i < data.length; i++){
                await this.sendSingleKey(ele, data, i)
            }   
            await this.getElementAttribute(xpath,"value").then(function(value){
                console.log("Text length: " + value.length)
                textLength= value.length
            }) 
        }finally{
            if(textLength!=data.length){
                await ele.clear()
                for(var i = 0; i < data.length; i++){
                    await this.sendSingleKey(ele, data, i)
                }   
            }
        }
    }

    async sendSingleKey(ele:ElementFinder, data:string, strIndex:number){
        await this.curBrowser.sleep(60)
        await ele.sendKeys(data.charAt(strIndex));
    }

    async waitForElementDisplay(xpath:string) {
        var ele = await this.curBrowser.element(by.xpath(xpath));
        await this.curBrowser.wait(this.until.presenceOf(ele), this.timeOut, 'Element ' + xpath +' takes too long to appear in the DOM');
        await this.curBrowser.wait(this.until.visibilityOf(ele), this.timeOut, 'Element '+ xpath +' is not visible on screen');
       
    }

    async getElementAttribute(xpath:string, attribute:string):Promise<string>{
        var ele:ElementFinder = await this.curBrowser.element(by.xpath(xpath))
        var attributeValue:string =""
        await this.curBrowser.wait(this.until.presenceOf(ele), this.timeOut, 'Element ' + xpath + ' takes too long to appear in the DOM' )
        
        await ele.getAttribute(attribute).then(function(value){
            console.log("Attribute value: " + value)
            attributeValue = value
        })
        return attributeValue
    }

}