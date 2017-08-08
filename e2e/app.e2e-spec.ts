import { Ng4FriendlyBetPage } from './app.po';

describe('ng4-friendly-bet App', () => {
  let page: Ng4FriendlyBetPage;

  beforeEach(() => {
    page = new Ng4FriendlyBetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
