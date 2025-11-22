import { insertScrapedData } from './database/db-helpers';

const urlTemplate = `https://www.ebidat.de/cgi-bin/ebidat.pl?m=%%&id=${index}`;
const sections = [
    {
        key: 'h',
        label: 'main',
        func: parseMain
    },
    {
        key: 'o',
        main: 'object',
        func: parseObject
    },
    {
        key: 'g',
        main: 'tourism',
        func: parseTourism
    },
    {
        key: 'n',
        main: 'references',
        func: parseReferences
    }
];

export async function scrapeSite(index: number) {
    console.log(`Scraping site at index: ${index}`);
    for (const section of sections) {
        const url = urlTemplate.replace('%%', section.key);
        console.log(`Fetching URL: ${url}`);
        const response = await fetch(url);
        const html = await response.text();
        const data = section.func(html);
        console.log(`Parsed data for section ${section.label}:`, data);
        insertScrapedData(index, data);
    }
}

function parseMain(html: string): any {
    return {};
}

function parseObject(html: string): any {
    return {};
}

function parseTourism(html: string): any {
    return {};
}

function parseReferences(html: string): any {
    return {};
}
