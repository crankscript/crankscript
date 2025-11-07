#!/usr/bin/env tsx

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

interface TypeFile {
    version: string;
    content: string;
}

async function main() {
    const typesDir = join(process.cwd(), 'types');

    if (!existsSync(typesDir)) {
        console.error('❌ Types directory not found');
        process.exit(1);
    }

    try {
        // Get all version files
        const versionFiles = getVersionFiles(typesDir);

        if (versionFiles.length === 0) {
            console.error('❌ No version files found in types directory');
            process.exit(1);
        }

        // Find the highest version
        const highestVersion = getHighestVersion(versionFiles);
        console.log(`🔍 Found highest version: ${highestVersion.version}`);

        // Read latest.d.ts
        const latestPath = join(typesDir, 'latest.d.ts');
        if (!existsSync(latestPath)) {
            console.error('❌ latest.d.ts not found');
            process.exit(1);
        }

        const latestContent = readFileSync(latestPath, 'utf-8');
        const latestFile: TypeFile = {
            version: 'latest',
            content: latestContent,
        };

        // Compare highest version with latest
        if (highestVersion.content === latestFile.content) {
            console.log('✅ Types validation passed: highest version matches latest.d.ts');
        } else {
            console.error('❌ Types validation failed!');
            console.error(`   Highest version (${highestVersion.version}) does not match latest.d.ts`);
            console.error('');
            console.error('   This could cause breaking changes for users.');
            console.error('   Please update latest.d.ts to match the highest version.');
            console.error('');
            console.error('   To fix this:');
            console.error(`   cp types/${highestVersion.version}.d.ts types/latest.d.ts`);
            process.exit(1);
        }

    } catch (error) {
        console.error('❌ Types validation failed:', error);
        process.exit(1);
    }
}

function getVersionFiles(typesDir: string): TypeFile[] {
    const files = [
        '2.6.0.d.ts',
        '2.7.4.d.ts',
        '2.7.5.d.ts',
        '2.7.6.d.ts',
        '3.0.1.d.ts',
    ];

    const versionFiles: TypeFile[] = [];

    for (const file of files) {
        const filePath = join(typesDir, file);
        if (existsSync(filePath)) {
            const content = readFileSync(filePath, 'utf-8');
            const version = file.replace('.d.ts', '');
            versionFiles.push({ version, content });
        }
    }

    return versionFiles;
}

function getHighestVersion(versionFiles: TypeFile[]): TypeFile {
    // Sort versions in descending order
    const sortedVersions = versionFiles.sort((a, b) => {
        return compareVersions(b.version, a.version);
    });

    return sortedVersions[0];
}

function compareVersions(versionA: string, versionB: string): number {
    const partsA = versionA.split('.').map(Number);
    const partsB = versionB.split('.').map(Number);

    const maxLength = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < maxLength; i++) {
        const partA = partsA[i] || 0;
        const partB = partsB[i] || 0;

        if (partA > partB) return 1;
        if (partA < partB) return -1;
    }

    return 0;
}

main().catch(console.error);
