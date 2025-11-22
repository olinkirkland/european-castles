import { createTable, getLastIndex } from './database/db-helpers';
import { scrapeSite } from './web-scraper';

async function main() {
    console.log('Hello world!');
    await createTable();

    // 1. Start scraping from last scraped id
    const index = await getLastIndex();

    while (true) await scrapeSite(index);
}

main().catch((err) => {
    console.error('Failed during main loop:', err);
    process.exit(1);
});
