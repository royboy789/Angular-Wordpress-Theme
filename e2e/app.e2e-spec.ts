import { Wpng2TestPage } from './app.po';

describe('wpng2-test App', function() {
  let page: Wpng2TestPage;

  beforeEach(() => {
    page = new Wpng2TestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
