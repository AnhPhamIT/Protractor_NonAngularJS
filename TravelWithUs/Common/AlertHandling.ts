import { ProtractorBrowser, protractor, ElementFinder } from "protractor";

export class AlertHandling{
    curBrowser:ProtractorBrowser
    until:any

    constructor(browser:ProtractorBrowser){
        this.curBrowser = browser
        this.until = protractor.ExpectedConditions
    }

    async verifyAndAcceptAlert(expectedValue:string, timeOut=60000){
        await this.curBrowser.wait(this.until.alertIsPresent(),timeOut, "Alert is not visible")
        var alert = await this.curBrowser.switchTo().alert()
        await expect(alert.getText()).toEqual(expectedValue)
        await alert.accept()
    }
    async verifyAndDismissAlert(expectedValue:string, timeOut=60000){
        await this.curBrowser.wait(this.until.alertIsPresent(),timeOut, "Alert is not visible")
        var alert = await this.curBrowser.switchTo().alert()
        await expect(alert.getText()).toEqual(expectedValue)
        await alert.accept()
    }
}