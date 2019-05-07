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
    beforeEach(async function(){
        await browser.restart()
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
        browser.get("http://11.11.254.57/travelwithus/index.php")
        debugger
        var email =dataArray[0].get("Email")
        var pasword= dataArray[0].get("Password")
        var title= dataArray[0].get("Title")
        var place= dataArray[0].get("Place")
        var startDate= dataArray[0].get("StartDate")
        var endDate= dataArray[0].get("EndDate")
        var members= dataArray[0].get("Members")

        debugger
        await loginPage.loginToWebsite(email, pasword)
        console.log("STEP 1: Create a new trip with those information " + title + ", " + place + ", " + startDate + ", " + endDate + ", " + members)
        debugger
        await homePage.creatingATrip(title, place, startDate, endDate, members)
        debugger
        // await homePage.confirmOnAlert("A new trip has been created!")
        await alertHandling.verifyAndAcceptAlert("A new trip has been created!")
        debugger
        await homePage.verifyNewTrip(title, place, startDate, endDate, members)
        
    })

    it("can delete trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "DeleteTrip", "TC02");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get("http://11.11.254.57/travelwithus/index.php")

        var email =dataArray[0].get("Email")
        var pasword= dataArray[0].get("Password")
        var title= dataArray[0].get("Title")
        var place= dataArray[0].get("Place")
        var startDate= dataArray[0].get("StartDate")
        var endDate= dataArray[0].get("EndDate")
        var members= dataArray[0].get("Members")

        await loginPage.loginToWebsite(email, pasword)
        debugger
        await homePage.creatingATrip(title, place, startDate, endDate, members)
        debugger
        await alertHandling.verifyAndAcceptAlert("A new trip has been created!")
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

    it("can edit trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "EditTrip", "TC03");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get("http://11.11.254.57/travelwithus/index.php")

        var email =dataArray[0].get("Email")
        var pasword= dataArray[0].get("Password")
        var title= dataArray[0].get("Title")
        var place= dataArray[0].get("Place")
        var startDate= dataArray[0].get("StartDate")
        var endDate= dataArray[0].get("EndDate")
        var members= dataArray[0].get("Members")

        await loginPage.loginToWebsite(email, pasword)
        await homePage.creatingATrip(title, place, startDate, endDate, members)
        await alertHandling.verifyAndAcceptAlert("A new trip has been created!")
        console.log("STEP 1: Edit trip with title " + title)
        debugger
        await homePage.editTrip(title, dataArray[0].get("EditTitle"), dataArray[0].get("EditPlace"), dataArray[0].get("EditStartDate"), dataArray[0].get("EditEndDate"), dataArray[0].get("EditMembers"))
        debugger
        console.log("STEP 2: verify alert message")
        await alertHandling.verifyAndAcceptAlert("The trip has been updated!")
        debugger
        console.log("STEP 3: accept the alert and make sure the deleted trip should not be showed on Trip table")
        await homePage.verifyNewTrip(dataArray[0].get("EditTitle"), dataArray[0].get("EditPlace"), dataArray[0].get("EditStartDate"), dataArray[0].get("EditEndDate"), dataArray[0].get("EditMembers"))

    })

    it("can add ToDo list for trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "AddToDo", "TC04");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get("http://11.11.254.57/travelwithus/index.php")

        var email =dataArray[0].get("Email")
        var pasword= dataArray[0].get("Password")
        var title= dataArray[0].get("Title")
        var place= dataArray[0].get("Place")
        var startDate= dataArray[0].get("StartDate")
        var endDate= dataArray[0].get("EndDate")
        var members= dataArray[0].get("Members")
        var name= dataArray[0].get("Name")
        var description= dataArray[0].get("Description")

        await loginPage.loginToWebsite(email, pasword)
        await homePage.creatingATrip(title, place, startDate, endDate, members)
        await alertHandling.verifyAndAcceptAlert("A new trip has been created!")
        console.log("STEP 1: Add ToDo list for trip with title " + title)
        await homePage.addToDo(title, name, description)

        await homePage.verifyNewToDo(name, description)
        
    })

    it("can edit ToDo list for trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "EditToDo", "TC05");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get("http://11.11.254.57/travelwithus/index.php")

        var email =dataArray[0].get("Email")
        var pasword= dataArray[0].get("Password")
        var title= dataArray[0].get("Title")
        var place= dataArray[0].get("Place")
        var startDate= dataArray[0].get("StartDate")
        var endDate= dataArray[0].get("EndDate")
        var members= dataArray[0].get("Members")
        var name= dataArray[0].get("Name")
        var description= dataArray[0].get("Description")

        await loginPage.loginToWebsite(email, pasword)
        await homePage.creatingATrip(title, place, startDate, endDate, members)
        await alertHandling.verifyAndAcceptAlert("A new trip has been created!")
        console.log("STEP 1: Add ToDo list for trip with title " + title)
        await homePage.addToDo(title, name, description)
        console.log("STEP 2: Mark Done on ToDO " + name)
        await homePage.editToDo(name)

        await homePage.verifyEditToDo(title, name)
        
    })

    it("can delete ToDo list for trip successfully", async function(){
        dataArray = await dataBuilder.readExcel(__dirname + "\\..\\TestData\\Trips.xlsx", "DeleteToDo", "TC06");
        browser.waitForAngularEnabled(false)
        browser.manage().window().maximize()
        browser.get("http://11.11.254.57/travelwithus/index.php")

        var email =dataArray[0].get("Email")
        var pasword= dataArray[0].get("Password")
        var title= dataArray[0].get("Title")
        var place= dataArray[0].get("Place")
        var startDate= dataArray[0].get("StartDate")
        var endDate= dataArray[0].get("EndDate")
        var members= dataArray[0].get("Members")
        var name= dataArray[0].get("Name")
        var description= dataArray[0].get("Description")

        await loginPage.loginToWebsite(email, pasword)
        await homePage.creatingATrip(title, place, startDate, endDate, members)
        await alertHandling.verifyAndAcceptAlert("A new trip has been created!")
        console.log("STEP 1: Add ToDo list for trip with title " + title)
        await homePage.addToDo(title, name, description)
        console.log("STEP 2: Delete on ToDO " + name)
        await homePage.deleteToDo(name)

        await homePage.verifyDeletedToDo(title, name)
        
    })
    afterEach(function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout
    })
})