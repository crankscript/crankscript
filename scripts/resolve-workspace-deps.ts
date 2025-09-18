#!/usr/bin/env tsx

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface PackageJson {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
}

function findPackageVersions(distPath: string): Map<string, string> {
    const versions = new Map<string, string>();

    function scanDirectory(dir: string) {
        const entries = readdirSync(dir);

        for (const entry of entries) {
            const fullPath = join(dir, entry);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (entry === 'package.json') {
                try {
                    const content = readFileSync(fullPath, 'utf8');
                    const pkg: PackageJson = JSON.parse(content);
                    if (pkg.name && pkg.version) {
                        versions.set(pkg.name, pkg.version);
                    }
                } catch (error) {
                    console.warn(
                        `Warning: Could not parse ${fullPath}:`,
                        error,
                    );
                }
            }
        }
    }

    scanDirectory(distPath);
    return versions;
}

function resolveWorkspaceReferences(
    packageJson: PackageJson,
    versions: Map<string, string>,
): boolean {
    let changed = false;

    if (packageJson.dependencies) {
        for (const [depName, depVersion] of Object.entries(
            packageJson.dependencies,
        )) {
            if (depVersion === 'workspace:*') {
                const resolvedVersion = versions.get(depName);
                if (resolvedVersion) {
                    packageJson.dependencies[depName] = resolvedVersion;
                    changed = true;
                    console.log(
                        `Resolved ${depName}: workspace:* -> ${resolvedVersion}`,
                    );
                } else {
                    console.warn(
                        `Warning: Could not resolve version for ${depName}`,
                    );
                }
            }
        }
    }

    if (packageJson.peerDependencies) {
        for (const [depName, depVersion] of Object.entries(
            packageJson.peerDependencies,
        )) {
            if (depVersion === 'workspace:*') {
                const resolvedVersion = versions.get(depName);
                if (resolvedVersion) {
                    packageJson.peerDependencies[depName] = resolvedVersion;
                    changed = true;
                    console.log(
                        `Resolved peerDependency ${depName}: workspace:* -> ${resolvedVersion}`,
                    );
                } else {
                    console.warn(
                        `Warning: Could not resolve version for peerDependency ${depName}`,
                    );
                }
            }
        }
    }

    return changed;
}

function processPackageJson(filePath: string, versions: Map<string, string>) {
    try {
        const content = readFileSync(filePath, 'utf8');
        const packageJson: PackageJson = JSON.parse(content);

        const changed = resolveWorkspaceReferences(packageJson, versions);

        if (changed) {
            writeFileSync(
                filePath,
                JSON.stringify(packageJson, null, 2) + '\n',
            );
            console.log(`Updated ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

function main() {
    const distPath = join(process.cwd(), 'dist', 'libs');

    console.log('Resolving workspace dependencies in dist/libs/*...');

    const versions = findPackageVersions(distPath);
    console.log(
        'Found packages:',
        Array.from(versions.entries())
            .map(([name, version]) => `${name}@${version}`)
            .join(', '),
    );

    function processDirectory(dir: string) {
        const entries = readdirSync(dir);

        for (const entry of entries) {
            const fullPath = join(dir, entry);
            const stat = statSync(fullPath);

            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (entry === 'package.json') {
                processPackageJson(fullPath, versions);
            }
        }
    }

    processDirectory(distPath);
    console.log('Workspace dependency resolution complete!');
}

main();
