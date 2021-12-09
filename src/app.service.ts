import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

const SELECTORS = {
  pasta_vivo: `div[aria-label="Claro"]`,
  INSIDE_CHAT: "document.getElementsByClassName('two')[0]",
  QRCODE_PAGE: 'body > div > div > .landing-wrapper',
  QRCODE_DATA: 'div[data-ref]',
  QRCODE_DATA_ATTR: 'data-ref',
  SEND_BUTTON: 'div:nth-child(2) > button > span[data-icon="send"]',
};
const pasta_telefone =
  'https://drive.google.com/drive/folders/1VzMgUHm8P1uNW3KIbem0Nrq-9KdybD-F?usp=sharing';
@Injectable()
export class AppService {
  page: any;
  constructor() {
    // (async () => {
    // })()
  }
  async getHello() {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow down by 250ms
    });
    this.page = await browser.newPage();
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.navigate(pasta_telefone);
    await this.localElement('Oi')
    // await this.page.waitForSelector(SELECTORS.pasta_vivo, { timeout: 5000 });
    // await this.page.waitFor(1000);

    // await page.waitForSelector(SELECTORS.SEND_BUTTON, { timeout: 5000 });
    // await browser.close();
  }

  private async localElement(text, element = 'div'){
    const result = await this.page.$x(`//${element}[contains(text(), '${text}')]`);
    if (result.length > 0) {
      await result[0].click();
    }
  }

  private async navigate(url) {
    await this.page.goto(url);
  }

  private getUrl() {
    return this.page.url();
  }
}
