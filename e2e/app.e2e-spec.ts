import { CrosswordsPage } from './app.po';

describe('crosswords App', function() {
  let page: CrosswordsPage;

  beforeEach(() => {
    page = new CrosswordsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
