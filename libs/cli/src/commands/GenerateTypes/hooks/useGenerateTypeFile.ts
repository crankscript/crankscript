import { join } from 'node:path';
import { load } from 'cheerio';
import { useMemo } from 'react';
import { Project } from 'ts-morph';
import { CheckListItem } from '@/cli/types.js';

export const useGenerateTypeFile = (path: string, html: string | null) => {
    const generateTypeFile = useMemo(() => {
        return {
            waitingDescription: 'Waiting to generate the type file...',
            errorDescription: 'Failed to generate the type file',
            finishedDescription: () => 'Type file generated',
            runningDescription: 'Generating the type file...',
            runner: async () => {
                if (!html) {
                    throw new Error('HTML is not set');
                }

                const project = new Project();
                const typeFile = project.createSourceFile(
                    join(path, 'playdate.d.ts'),
                    '',
                    {
                        overwrite: true,
                    }
                );

                typeFile.addStatements(
                    '/// <reference types="lua-types/5.4" />'
                );

                const $ = load(html);

                typeFile.saveSync();
            },
            ready: html !== null,
        } satisfies CheckListItem<void>;
    }, [html]);

    return {
        generateTypeFile,
    };
};
