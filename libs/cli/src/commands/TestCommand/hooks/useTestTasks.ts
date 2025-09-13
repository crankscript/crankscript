import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { Environment } from '@/cli/environment/dto/Environment.js';
import type { CheckListItem } from '@/cli/types.js';
import { useSimulatorTasks } from '../../SimulatorCommand/hooks/useSimulatorTasks.js';
import { useTestFiles } from './useTestFiles.js';

export const useTestTasks = ({
    environment,
    path,
    watch,
}: {
    environment: Environment;
    path: string;
    watch: boolean;
}) => {
    const testFiles = useTestFiles({ path });

    const injectionTask: CheckListItem<unknown> = {
        waitingDescription: 'Waiting to inject test file imports...',
        errorDescription: 'Could not inject test file imports',
        runningDescription: 'Injecting test file imports...',
        finishedDescription: () =>
            `Injected ${testFiles.length} test file imports`,
        runner: async () => {
            const testFilePath = join(path, 'src', 'test.ts');
            const sourceDir = join(path, 'TestSource');
            const importStatements = testFiles
                .map((testFile) => {
                    const relativePath = relative(join(path, 'src'), testFile);
                    return `import './${relativePath}';`;
                })
                .join('\n');
            const currentContent = readFileSync(testFilePath, 'utf-8');
            const startMarker = '// @crankscript-test-imports-start';
            const endMarker = '// @crankscript-test-imports-end';
            const startIndex = currentContent.indexOf(startMarker);
            const endIndex = currentContent.indexOf(endMarker);

            if (startIndex === -1 || endIndex === -1) {
                throw new Error(
                    'Could not find test import markers in test.ts. Please add:\n// @crankscript-test-imports-start\n// @crankscript-test-imports-end',
                );
            }

            const beforeImports = currentContent.substring(
                0,
                startIndex + startMarker.length,
            );
            const afterImports = currentContent.substring(endIndex);
            const newContent = `${beforeImports}\n${importStatements}\n${afterImports}`;

            writeFileSync(testFilePath, newContent, 'utf-8');

            const testOptions = {
                watch: watch,
                shouldCloseOnComplete: !watch,
            };

            if (!existsSync(sourceDir)) {
                mkdirSync(sourceDir, { recursive: true });
            }

            const testOptionsPath = join(sourceDir, 'test-options.json');
            writeFileSync(
                testOptionsPath,
                JSON.stringify(testOptions, null, 2),
                'utf-8',
            );

            return { injectedFiles: testFiles, importStatements, testOptions };
        },
        ready: true,
    };

    const simulatorTasks = useSimulatorTasks({
        environment,
        background: false,
        path,
        recompileOnly: true,
        watchForChanges: watch,
        entryFile: join(path, 'src', 'test.ts'),
        sourceName: 'TestSource',
        targetName: 'Test.pdx',
        watchEntryFileOnly: false,
        preventAutoQuit: !watch,
    });

    return {
        ...simulatorTasks,
        tasks: [injectionTask, ...simulatorTasks.tasks],
    };
};
