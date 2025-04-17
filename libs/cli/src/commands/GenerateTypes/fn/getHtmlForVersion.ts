import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const getHtmlForVersion = async (version: string) => {
    const cacheDir = join(tmpdir(), 'crankscript', 'cache');
    const path = join(cacheDir, `${version}.html`);

    if (!existsSync(cacheDir)) {
        mkdirSync(cacheDir, { recursive: true });
    }

    if (existsSync(path)) {
        return readFileSync(path, 'utf8');
    }

    const html = await fetch(`https://sdk.play.date/${version}/`).then(res =>
        res.text(),
    );

    writeFileSync(path, html, 'utf8');

    return html;
};
