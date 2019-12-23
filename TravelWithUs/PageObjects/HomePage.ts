import { ActionSupport } from '../../core_function/actionSupport/actionSupport';
import { SelectSupport } from '../../core_function/actionSupport/selectSupport';
import { TableSupport } from '../../core_function/actionSupport/tableSupport';
import { element, by, ProtractorBrowser } from 'protractor';
import { start } from 'repl';

export class HomePage{
    curBrowser:ProtractorBrowser
    actionSupport:ActionSupport
    selectSupport:SelectSupport
    tableSupport:TableSupport

    //define HomePage elements
    creatTrip_lnk:string
    title_txt:string
    place_txt:string
    startTrip_dtp:string
    endTrip_dtp:string
    members_ddl:string

    submit_btn:string
    trip_tbl:string
    todo_tbl:string

    //Delete a trip
    oK_btn:string
    cancel_btn:string
    conTitle:string

    //add ToDo list
    todoName_txt:string
    todoDes_txt:string
    addNewToDo_btn:string
    todoDone_cbx:string
    todoClose_btn:string

    constructor(browser: ProtractorBrowser){
        console.log("Initialize all elements in HomePage")
        this.curBrowser = browser
        this.actionSupport = new ActionSupport(this.curBrowser)

        this.creatTrip_lnk ="//a[text()='Create Trip']"
        this.title_txt="//input[@id='title']"
        this.place_txt ="//input[@id='place']"

        this.startTrip_dtp="//input[@id='start_date_val']"
        this.endTrip_dtp="//input[@id='end_date_val']"

        //dropdownlist elements
        this.members_ddl="//select[@id='members']"
        this.selectSupport = new SelectSupport(this.members_ddl,this.curBrowser)

        //table elements
        this.trip_tbl = "//table[contains(@class,'my-trip-table')]"
        console.log("HomePage: create new instance for table support")
        this.tableSupport = new TableSupport(this.trip_tbl, this.curBrowser)

        this.submit_btn="//form[@name='tripForm']//descendant::button[text()='Submit']"

        this.oK_btn="//button[text()='OK']"
        this.cancel_btn="//button[text()='OK']"
        this.conTitle="//input[@id='tripName']"

        this.todoName_txt="//input[@placeholder='Name']"
        this.todoDes_txt="//input[@placeholder='Description']"
        this.addNewToDo_btn="//button[text()='Add new todo']"
        this.todo_tbl="//table"
        this.todoDone_cbx ="//input[@type='checkbox']"
        this.todoClose_btn="//a[contains(@class,'close-button')]"
    }

    getWelcome_lbl(email:string){
        //return "//a[contains(text(),'Welcome " + email+ "')]" 
        return "//a[normalize-space(.)='Welcome "+email+"']"
    }

    getToday_xpath(dateTimePickerIndex:string){
        return "//div[contains(@class,'datetimepicker')]["+dateTimePickerIndex+"]/div[@class='datetimepicker-days']//descendant::tfoot/tr/th[text()='Today']"
    }

    getSwitch_xpath(dateTimePickerIndex:string){
        return "//div[contains(@class,'datetimepicker')]["+dateTimePickerIndex+"]/div[@class='datetimepicker-days']//descendant::thead/tr/th[@class='switch']"
    }

    getMonth_xpath(dateTimePickerIndex:string, month:string){
        return "//div[contains(@class,'datetimepicker')]["+dateTimePickerIndex+"]/div[@class='datetimepicker-months']//descendant::tbody/tr/td/span[text()='" + month + "']"
    }

    getDate_xpath(dateTimePickerIndex:string,date:string){
        return "//div[contains(@class,'datetimepicker')]["+dateTimePickerIndex+"]/div[@class='datetimepicker-days']//descendant::tbody/tr/td[@class='day'][text()='"+date+"']"
    }

    async fillTripInformation(title:string, place:string, startDate:string, endDate:string, members:string){
        
        await this.actionSupport.sendKeysOnElement(this.title_txt, title)
        await this.actionSupport.sendKeysOnElement(this.place_txt, place)
        
        console.log("HomePage: Select start date")
        await this.selectDateTimePicker("1", startDate)

        console.log("HomePage: select end date")
        await this.selectDateTimePicker("2", endDate)

        await this.selectSupport.selectByVisibleText(members)

        await this.actionSupport.waitForElementDisplay(this.submit_btn)
        await this.actionSupport.clickOnElement(this.submit_btn)
        console.log("HomePage: click on Submit")
    }

    convertDateToYYYYMMDD(dateStr:string) {
        var parts = dateStr.split("/")
        var date= parts[0]
        var month = parts[1]
        var year=parts[2]
        var dateTime:string
        if(parts[0].length<2){
            date= "0"+ parts[0]
        }
        if(parts[1].length<2){
            month = "0"+ parts[1]
        }
        if(parts[2].length==2){
            year="20"+ parts[2]
        }
        dateTime=year +"-"+ month+"-"+date
        return dateTime
    }
    async creatingATrip(title:string, place:string, startDate:string, endDate:string, members:string){
        await this.actionSupport.clickOnElement(this.creatTrip_lnk)
        await this.fillTripInformation(title, place, startDate, endDate, members)
    }

    async verifyNewTrip(title:string, place:string, startDate:string, endDate:string, members:string){
        console.log("HomePage: verifying trip table ....")
        debugger
        var startDate= this.convertDateToYYYYMMDD(startDate)
        var endDate= this.convertDateToYYYYMMDD(endDate)

        await this.actionSupport.waitForElementDisplay(this.trip_tbl)
        debugger
        await this.tableSupport.getATripRow(title).then(function(value){
            expect(value).toEqual([ place, startDate, endDate, members, '' ])
        })

        // await this.curBrowser.element(by.xpath("//table[contains(@class,'my-trip-table')]/tbody")).all(by.css("tr")).count().then(function(value){
        //     console.log(value)
        //     columnNo = value
        // })
        // var rowCount = 0
        // await this.tableSupport.getRowCount().then(function(value){
        //     rowCount = value
        // })
        // console.log("Row count " + rowCount)

        // var columnCount=0
        // await this.tableSupport.getColumnCount().then(function(value){
        //     columnCount = value
        // })
        // console.log("Column count " + columnCount)
        // await this.tableSupport.getCellData(1,2).then(function(value){
        //     console.log(value)
        // })
    
        // await this.tableSupport.readAllTable().then(function(value){
        //     console.log(value)
        // })
    }

    async verifyDeletedTrip(title:string){
        await this.actionSupport.waitForElementDisplay(this.trip_tbl)
        await this.tableSupport.getATripRow(title).then(function(value){
            debugger
            expect(value.length).toEqual(0)
        })
    }

    async deleteTrip(tripTitle:string){
        console.log("HomePage: click on Delete button")
        await this.tableSupport.doActionOnTrip(tripTitle, "Delete")
        await expect(await this.actionSupport.getElementAttribute(this.conTitle,"value")).toEqual(tripTitle)
        await this.actionSupport.clickOnElement(this.oK_btn)
    }

    async editTrip(tripTitle:string, editTitle:string, editPlace:string, editStartDate:string, editEndDate:string, editMembers:string){
        console.log("HomePage: click on Edit button")
        await this.tableSupport.doActionOnTrip(tripTitle, "Edit")
        await expect(await this.actionSupport.getElementAttribute(this.title_txt,"value")).toEqual(tripTitle)
        console.log("HomePage: Edit trip information")
        await this.fillTripInformation(editTitle,editPlace,editStartDate,editEndDate,editMembers)
        debugger
    }

    async addToDo(tripTitle:string, name:string, description:string){
        console.log("HomePage: click on Todo List button")
        await this.tableSupport.doActionOnTrip(tripTitle, "Todo List")

        await this.addNewToDo(name, description)
        debugger
    }

    async selectToDoList(tripTitle:string){
        await this.tableSupport.doActionOnTrip(tripTitle, "Todo List")
    }

    async editToDo(name:string){
        console.log("Homepage: Tick checkbox Done")
        var ele= await this.curBrowser.findElement(by.xpath("//iframe[@id='forPostyouradd']"))
        await this.curBrowser.sleep(5000)
        await this.curBrowser.switchTo().frame(ele)
        await this.tableSupport.markDoneOnToDo(name)
        await this.curBrowser.sleep(3000)
        await this.curBrowser.switchTo().defaultContent()
        await this.actionSupport.clickOnElement(this.todoClose_btn)
        debugger
    }

    
    async deleteToDo(name:string){
        console.log("Homepage: Tick checkbox Done")
        var ele= await this.curBrowser.findElement(by.xpath("//iframe[@id='forPostyouradd']"))
        await this.curBrowser.sleep(5000)
        await this.curBrowser.switchTo().frame(ele)
        await this.tableSupport.deleteToDo(name)
        await this.curBrowser.sleep(3000)
        await this.curBrowser.switchTo().defaultContent()
        await this.actionSupport.clickOnElement(this.todoClose_btn)
    }

    async verifyDeletedToDo(tripTitle:string, name:string){
        debugger
        await this.tableSupport.doActionOnTrip(tripTitle, "Todo List")
        var ele= await this.curBrowser.findElement(by.xpath("//iframe[@id='forPostyouradd']"))
        await this.curBrowser.sleep(10000)
        await this.curBrowser.switchTo().frame(ele)
        this.tableSupport= new TableSupport(this.todo_tbl, this.curBrowser)
        await this.tableSupport.getAToDoRow(name).then(function(value){
            console.log("++++++++++++++" + value.length)
            expect(value.length).toEqual(0)
        })
    }
    async verifyEditToDo(tripTitle:string, name:string){
        await this.tableSupport.doActionOnTrip(tripTitle, "Todo List")
        var ele= await this.curBrowser.findElement(by.xpath("//iframe[@id='forPostyouradd']"))
        await this.curBrowser.sleep(5000)
        await this.curBrowser.switchTo().frame(ele)
        ///check the checkbox is ticked or not
        
        await this.tableSupport.getToDoChBoxValue(name)
    }
    async addNewToDo(name:string, description:string){
        console.log("Homepage: Add a new ToDo list with name  " + name + " and description " + description)
        var ele= await this.curBrowser.findElement(by.xpath("//iframe[@id='forPostyouradd']"))
        await this.curBrowser.sleep(5000)
        await this.curBrowser.switchTo().frame(ele)
        //await this.curBrowser.switchTo().frame(1)

        await this.actionSupport.sendKeysOnElement(this.todoName_txt, name)
        await this.actionSupport.sendKeysOnElement(this.todoDes_txt, description)
        await this.actionSupport.clickOnElement(this.addNewToDo_btn)
        debugger
    }

    async verifyNewToDo(name:string, description:string){
        this.tableSupport= new TableSupport(this.todo_tbl, this.curBrowser)
        await this.tableSupport.getAToDoRow(name).then(function(value){
            debugger
            expect(value).toEqual([ description, '', 'DELETE' ])
        })
    }
    async selectDateTimePicker(dateTimePickerIndex:string, fullDate:string){
        var month= this.getMonth(fullDate)
        var date = this.getDate(fullDate)
        console.log("HomePage: click on the DateTimPicker " + dateTimePickerIndex)
        switch (dateTimePickerIndex) {
            case "1":
                await this.actionSupport.clickOnElement(this.startTrip_dtp)
                break;
            case "2":
                await this.actionSupport.clickOnElement(this.endTrip_dtp)
                break;
            default:
                console.log("HomePage: DateTimePicker Index is  "+dateTimePickerIndex +" invalid ")
                break;
        }
        console.log("HomePage: switch to Month view")
        await this.actionSupport.clickOnElement(this.getSwitch_xpath(dateTimePickerIndex))
        console.log("HomePage: click on " + month)
        await this.actionSupport.clickOnElement(this.getMonth_xpath(dateTimePickerIndex,month))
        console.log("HomePage: click on "+ date)
        await this.actionSupport.clickOnElement(this.getDate_xpath(dateTimePickerIndex,date))
    }

    getMonth(fullDate:string):string{
        var month=fullDate.split("/")[1]
        
        switch (month) {
            case "1" : case "01":
                month="Jan"
                break;
            case "2": case "02":
                month="Feb"
                break;
            case "3": case "03":
                month="Mar"
                break;
            case "4": case "04":
                month="Apr"
                break;
            case "5": case "05":
                month="May"
                break;
            case "6": case "06":
                month="Jun"
                break;
            case "7": case "07":
                month="Jul"
                break;
            case "8": case "08":
                month="Aug"
                break;
            case "9": case "09":
                month="Sep"
                break;
            case "10":
                month="Oct"
                break;
            case "11":
                month="Nov"
                break;
            case "12":
                month="Dec"
                break;
            default:
                console.log("HomePage: Input month "+month+ " is invalid")
                break;
        }
        console.log("HomePage: Month is "+ month)
        return month
    }

    getDate(fullDate:string):string{
        return fullDate.split("/")[0]
    }
}