import { EmiratesEmployeeAjsPage } from './app.po';

describe('emirates-employee-ajs App', () => {
  let page: EmiratesEmployeeAjsPage;

  beforeEach(() => {
    page = new EmiratesEmployeeAjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
