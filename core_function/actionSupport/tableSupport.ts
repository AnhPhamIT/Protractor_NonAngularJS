import { ProtractorBrowser, by, ElementFinder, promise, element } from "protractor";
import { ActionSupport } from "./actionSupport";

export class TableSupport{
    curBrowser:ProtractorBrowser
    actionSupport:ActionSupport
    table_xpath:string
    //table_ele:ElementFinder
    
    constructor(table_xpath:string, browser:ProtractorBrowser){
        this.curBrowser= browser
        this.actionSupport= new ActionSupport(this.curBrowser)
        console.log("TableSupport: constructor of table support")
        this.table_xpath=table_xpath
        //this.table_ele = this.curBrowser.element(by.xpath(table_xpath))
    }

    //getRowNo
    async getRowCount(){
        // var rowNumber=0
        // console.log("Getting row count")
        // await this.curBrowser.element(by.xpath("//table[contains(@class,'my-trip-table')]/tbody")).all(by.css("tr")).count().then(function(value){
        //     console.log(value)
        //     rowNumber= value;
        // })
        // console.log("Row number " + rowNumber)
        // return rowNumber
        //return await this.table_ele.element(by.xpath("tbody")).all(by.xpath("tr")).count()
        await this.actionSupport.waitForElementDisplay(this.table_xpath)
        return await this.curBrowser.element(by.xpath(this.table_xpath)).all(by.tagName("tr")).count()
    }

    //getColumnsNo
    async getColumnCount(){
        //return await this.table_ele.element(by.xpath("thead/tr")).all(by.css("th")).count()
        await this.actionSupport.waitForElementDisplay(this.table_xpath)
        return await this.curBrowser.element(by.xpath(this.table_xpath)).all(by.css("th")).count()
    }

    //getCellData
    async getCellData(rowIndex:number, colIndex:number){
        if(rowIndex == 0){
			throw new Error("Row number starts from 1");
        }
        await this.actionSupport.waitForElementDisplay(this.table_xpath)
        return await this.curBrowser.element(by.xpath(this.table_xpath)).all(by.xpath("tbody/tr["+rowIndex+"]/td["+colIndex+"]")).getText()
    }

    //readAllTable
    async readAllTable(){
        await this.actionSupport.waitForElementDisplay(this.table_xpath)
        return await this.curBrowser.element(by.xpath(this.table_xpath)).all(by.xpath("tbody/tr/td")).getText()
    }

    //search and get all data in the specific row
    async getATripRow(tripName:string){
        await this.actionSupport.waitForElementDisplay(this.table_xpath)
        return await this.curBrowser.element(by.xpath(this.table_xpath)).all(by.xpath("tbody/tr/td[text()='"+tripName+"']/following-sibling::td")).getText()
    }

    async getAToDoRow(todoName:string){
        await this.actionSupport.waitForElementDisplay(this.table_xpath)
        return await this.curBrowser.element(by.xpath(this.table_xpath)).all(by.xpath("tbody/tr/td[text()='"+todoName+"']/following-sibling::td")).getText()
    }

    async getToDoChBoxValue(todoName:string){
        await this.actionSupport.waitForElementDisplay("//tbody/tr/td[text()='"+todoName+"']/following-sibling::td/div/input[@type='checkbox']")
        var ele= this.curBrowser.element(by.xpath("//tbody/tr/td[text()='"+todoName+"']/following-sibling::td/div/input[@type='checkbox']"))
        await this.curBrowser.sleep(3000)
        await ele.isSelected().then(function(value){
            console.log("checkbox status " + value)
            debugger
        })
        
        await expect(ele.isSelected()).toBe(true)
    }

    //do action base on trip name
    async doActionOnTrip(tripName:string, action:string){
        var ele_xpath="//tbody/tr/td[text()='"+tripName+"']/following-sibling::td/button[@title='"+action+"']"
        //var ele = this.curBrowser.element(by.xpath(this.table_xpath)).element(by.xpath("tbody/tr/td[text()='"+tripName+"']/following-sibling::td/button[@title='"+action+"']"))
        await this.actionSupport.clickOnElement(ele_xpath)
    }

    async markDoneOnToDo(todoName:string){        
        await this.actionSupport.clickOnElement("//tbody/tr/td[text()='"+todoName+"']/following-sibling::td/div/input[@type='checkbox']")    
    }
    async deleteToDo(todoName:string){
        await this.actionSupport.clickOnElement("//tbody/tr/td[text()='"+todoName+"']/following-sibling::td/div/button[text()='DELETE']")
    }
}