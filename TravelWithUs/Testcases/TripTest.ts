import { browser } from "protractor";
import { HomePage } from "../PageObjects/HomePage";
import { LoginPage } from "../PageObjects/LoginPage";
import { dataBuilder } from "../../core_function/databuilder";
import { AlertHandling } from "../Common/AlertHandling";

describe("User", function(){
    var homePage:HomePage
    var loginPage:LoginPage
    var dataArray
    var originalTimeout:number;
    var alertHandling:AlertHandling
    var appURL=browser.params.appURL
    var email=browser.params.user
    var password=browser.params.pass


    beforeEach(async function(){
        loginPage= new LoginPage(browser)
        homePage=new HomePage(browser)
        alertHandling = new AlertHandling(browser)
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
    })
    it("can create trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "CreateTrip", "TC01");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(appURL)
        debugger

        var title= dataArray[0].get("Title")
        var place= dataArray[0].get("Place")
        var startDate= dataArray[0].get("StartDate")
        var endDate= dataArray[0].get("EndDate")
        var members= dataArray[0].get("Members")

        await loginPage.loginToWebsite(email, password)
        console.log("STEP 1: Create a new trip with those information " + title + ", " + place + ", " + startDate + ", " + endDate + ", " + members)
        await homePage.creatingATrip(title, place, startDate, endDate, members)
        await alertHandling.verifyAndAcceptAlert("A new trip has been created!")
        await homePage.verifyNewTrip(title, place, startDate, endDate, members)
        
    })

    xit("can add ToDo list for trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "AddToDo", "TC04");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(appURL)

        var title= dataArray[0].get("Title")
        var name= dataArray[0].get("Name")
        var description= dataArray[0].get("Description")

        await loginPage.loginToWebsite(email, password)
        console.log("STEP 1: Add ToDo list for trip with title " + title)
        await homePage.addToDo(title, name, description)
        await browser.sleep(3000)
        console.log("STEP 2: Verify new ToDo list")
        await homePage.verifyNewToDo(name, description)
        
    })

    xit("can edit ToDo list for trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "EditToDo", "TC05");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(browser.params.appURL)

        var title= dataArray[0].get("Title")
        var name= dataArray[0].get("Name")

        await loginPage.loginToWebsite(email, password)
        console.log("STEP 1: Mark Done on ToDO " + name)
        await homePage.selectToDoList(title)
        await homePage.editToDo(name)
        console.log("STEP 2: Verify edited ToDo list")
        await homePage.verifyEditToDo(title, name)
        
    })

    xit("can delete ToDo list for trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "DeleteToDo", "TC06");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(browser.params.appURL)

        var title= dataArray[0].get("Title")
        var name= dataArray[0].get("Name")

        await loginPage.loginToWebsite(email, password)
        console.log("STEP 1: Delete on ToDO " + name)
        await homePage.selectToDoList(title)
        await homePage.deleteToDo(name)

        console.log("STEP 2: Verify deleted ToDo")
        await homePage.verifyDeletedToDo(title, name)
        
    })

    it("can edit trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "EditTrip", "TC03");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(browser.params.appURL)

        var title= dataArray[0].get("Title")

        await loginPage.loginToWebsite(email, password)
        console.log("STEP 1: Edit trip with title " + title)
        await homePage.editTrip(title, dataArray[0].get("EditTitle"), dataArray[0].get("EditPlace"), dataArray[0].get("EditStartDate"), dataArray[0].get("EditEndDate"), dataArray[0].get("EditMembers"))
        debugger
        console.log("STEP 2: verify alert message")
        await alertHandling.verifyAndAcceptAlert("The trip has been updated!")
        debugger
        console.log("STEP 3: accept the alert and make sure the deleted trip should not be showed on Trip table")
        await homePage.verifyNewTrip(dataArray[0].get("EditTitle"), dataArray[0].get("EditPlace"), dataArray[0].get("EditStartDate"), dataArray[0].get("EditEndDate"), dataArray[0].get("EditMembers"))

    })

    it("can delete trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "DeleteTrip", "TC02");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get(browser.params.appURL)

        var title= dataArray[0].get("Title")

        await loginPage.loginToWebsite(email, password)
        console.log("STEP 1: Delete trip with title " + title)
        debugger
        await homePage.deleteTrip(title)
        debugger
        console.log("STEP 2: verify alert message")
        await alertHandling.verifyAndAcceptAlert("The trip has been deleted!")
        debugger
        console.log("STEP 3: accept the alert and make sure the deleted trip should not be showed on Trip table")
        await homePage.verifyDeletedTrip(title)
    })

    afterEach(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })
})
