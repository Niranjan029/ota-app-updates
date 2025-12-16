// const fs = require('fs-extra');
// const archiver = require('archiver');
// const path = require('path');

// // --- CONFIGURATION ---
// // 1. Path to your ACTUAL Capacitor App source code (where you run 'npm run build')
// const APP_SOURCE_DIR = path.resolve(__dirname, '../../Demo-OTA-Test'); 

// // 2. The output directory in your Capacitor app (usually 'dist', 'www', or 'build')
// const BUILD_OUTPUT_DIR = 'www'; 

// // 3. The public URL where this repo will be hosted (e.g., GitHub Pages)
// const PUBLIC_HOST_URL = 'https://niranjan029.github.io/ota-app-updates';
// // ---------------------

// const bundlesDir = path.resolve(__dirname, '../bundles');
// const versionFile = path.resolve(__dirname, '../version.json');

// async function run() {
//     // 1. Read the version from your APP's package.json
//     const appPackage = require(path.join(APP_SOURCE_DIR, 'package.json'));
//     const version = appPackage.version;
//     const zipName = `app-${version}.zip`;
//     const zipPath = path.join(bundlesDir, zipName);

//     console.log(`📦 Detected Version: ${version}`);

//     // 2. Check if this version already exists
//     if (fs.existsSync(zipPath)) {
//         console.error(`❌ Error: Bundle ${zipName} already exists! Update package.json version in your app first.`);
//         process.exit(1);
//     }

//     // 3. Build the App
//     console.log('🛠️  Building the app...');
//     const exec = require('child_process').execSync;
//     exec('npm run build', { cwd: APP_SOURCE_DIR, stdio: 'inherit' });

//     // 4. Create the ZIP file
//     console.log('🤐 Zipping the build...');
//     await fs.ensureDir(bundlesDir);
//     const output = fs.createWriteStream(zipPath);
//     const archive = archiver('zip', { zlib: { level: 9 } });

//     output.on('close', () => {
//         console.log(`✅ Zip created: ${zipName} (${archive.pointer()} bytes)`);
//         updateManifest(version, zipName);
//     });

//     archive.on('error', (err) => { throw err; });
//     archive.pipe(output);

//     // ZIP the CONTENTS of the dist folder, not the folder itself
//     archive.directory(path.join(APP_SOURCE_DIR, BUILD_OUTPUT_DIR), false);
//     await archive.finalize();
// }

// function updateManifest(version, zipName) {
//     // 5. Update version.json
//     const manifest = {
//         version: version,
//         url: `${PUBLIC_HOST_URL}/bundles/${zipName}`
//     };

//     fs.writeFileSync(versionFile, JSON.stringify(manifest, null, 2));
//     console.log('📝 version.json updated!');
//     console.log('\n✅ DONE! Now commit and push these changes to GitHub.');
// }

// run().catch(err => console.error(err));