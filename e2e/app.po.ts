import { browser, by, element } from 'protractor';

export class EmiratesEmployeeAjsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
