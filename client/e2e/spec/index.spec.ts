const TIMEOUT = 30_000;

beforeEach(async () => {
    await page.goto('http://localhost:3000');
});

describe('Main page', () => {
    it(`Checks title`, async () => {
        const title = await page.title();

        expect(title).toEqual(`Find your dog's breed`);
    });

    it(`Shows info message if can't find the dog`, async () => {
        const fileInput = await page.$('input[type=file]');

        await fileInput!.uploadFile('./client/e2e/spec/cloud.jpeg');

        await page.waitForSelector('span[data-e2e="unknown-breed"]', {timeout: TIMEOUT});

        const dogs = await page.$$('section[data-e2e="dog"]');

        expect((dogs || []).length).toEqual(0);
    });

    it(`Finds the dogs for the uploaded picture`, async () => {
        const fileInput = await page.$('input[type=file]');

        await fileInput!.uploadFile('./client/e2e/spec/retriever.jpeg');

        await page.waitForSelector('span[data-e2e="known-breed"]', {timeout: TIMEOUT});
        await page.waitForSelector('div[data-e2e="dogs"]', {timeout: TIMEOUT});

        const dogs = await page.$$('section[data-e2e="dog"]');

        expect((dogs || []).length).toEqual(6);
    });

    it(`Finds more dogs while scrolling`, async () => {
        const fileInput = await page.$('input[type=file]');

        await fileInput!.uploadFile('./client/e2e/spec/retriever.jpeg');

        await page.waitForSelector('span[data-e2e="known-breed"]', {timeout: TIMEOUT});
        await page.waitForSelector('div[data-e2e="dogs"]', {timeout: TIMEOUT});
        const dogs = await page.$$('section[data-e2e="dog"]');

        expect((dogs || []).length).toEqual(6);

        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });

        await page.waitForTimeout(1000);

        await page.waitForSelector('img[data-e2e="spinner"]', {timeout: TIMEOUT, hidden: true});

        const updatedDogs = await page.$$('section[data-e2e="dog"]');

        expect(updatedDogs?.length).toBeGreaterThan(6);
    });
});

// eslint-disable-next-line jest/no-export
export {};
