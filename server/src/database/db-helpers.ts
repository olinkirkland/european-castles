import sql from './db';

export async function createTable() {
    // Delete the table if it exists
    await sql`
        DROP TABLE IF EXISTS castles_scraped;
    `;

    await sql`
        CREATE TABLE IF NOT EXISTS castles_scraped (
            id SERIAL PRIMARY KEY,
            ebidat_index INTEGER,
            scraped JSON
        );
    `;
}

export async function getLastIndex(): Promise<number> {
    const result = await sql`
        SELECT ebidat_index
        FROM castles_scraped
        ORDER BY ebidat_index DESC
        LIMIT 1;
    `;

    if (result.length === 0) return 0;
    return result[0].ebidat_index;
}

export async function insertScrapedData(index: number, scrapedData: any) {
    await sql`
        INSERT INTO castles_scraped (ebidat_index, scraped)
        VALUES (${index}, ${JSON.stringify(scrapedData)});
    `;
}
