const fs = require('fs');
const path = require('path');

// Directory containing custom model files
const customModelsDir = path.join(__dirname, '../custom-models');
// Generated models directory
const generatedModelsDir = path.join(__dirname, '../src/models');

// Directory containing plugin client files
const pluginClientsDir = path.join(__dirname, '../plugin-clients');
// Generated clients directory
const generatedClientsDir = path.join(__dirname, '../src/clients');

// Create models directory if it doesn't exist
if (!fs.existsSync(generatedModelsDir)) {
  console.log(`Models directory ${generatedModelsDir} doesn't exist. Creating it.`);
  fs.mkdirSync(generatedModelsDir, { recursive: true });
}

// Read all custom model files and copy them over the generated ones
try {
  const files = fs.readdirSync(customModelsDir);
  const customModelNames = [];

  files.forEach((file) => {
    if (file.endsWith('.ts')) {
      const source = path.join(customModelsDir, file);
      const destination = path.join(generatedModelsDir, file);
      const modelName = file.replace('.ts', '');

      console.log(`Processing custom model ${file} to ${destination}`);

      // Read the source file content
      const content = fs.readFileSync(source, 'utf8');

      // Normalize import paths from custom-models structure to src/models structure
      const processedContent = content.replace(
        /from\s+['"]\.\.\/src\/models\/([^'"]+)['"]/g,
        (_match, mod) => `from './${mod}'`,
      );

      // Write the processed content to destination
      fs.writeFileSync(destination, processedContent, 'utf8');

      // Track custom model names for index.ts exports
      customModelNames.push(modelName);
    }
  });

  // Update models/index.ts to include exports for custom models
  const indexPath = path.join(generatedModelsDir, 'index.ts');
  if (fs.existsSync(indexPath) && customModelNames.length > 0) {
    console.log('Updating models/index.ts with custom model exports...');

    let indexContent = fs.readFileSync(indexPath, 'utf8');

    // Parse existing exports to avoid duplicates
    const existingExports = new Set();
    const exportRegex = /^export \* from ['"]\.\/([^'"]+)['"];?\s*$/gm;
    let match;
    while ((match = exportRegex.exec(indexContent)) !== null) {
      existingExports.add(match[1]); // Add the module name (without quotes and path)
    }

    customModelNames.forEach((modelName) => {
      if (!existingExports.has(modelName)) {
        const exportLine = `export * from './${modelName}';`;
        console.log(`Adding export for ${modelName}`);
        indexContent += `${exportLine}\n`;
        existingExports.add(modelName); // Track what we've added
      } else {
        console.log(`Export for ${modelName} already exists, skipping`);
      }
    });

    fs.writeFileSync(indexPath, indexContent, 'utf8');
  }

  console.log('Successfully processed and replaced generated models with custom ones.');
} catch (error) {
  console.error('Error during post-generation script (models):', error);
  process.exit(1);
}

// Copy plugin-clients directory recursively
try {
  console.log('\nProcessing plugin clients...');

  if (!fs.existsSync(pluginClientsDir)) {
    console.log('No plugin-clients directory found, skipping client copy.');
  } else {
    // Create clients directory if it doesn't exist
    if (!fs.existsSync(generatedClientsDir)) {
      console.log(`Clients directory ${generatedClientsDir} doesn't exist. Creating it.`);
      fs.mkdirSync(generatedClientsDir, { recursive: true });
    }

    // Recursively copy directory
    function copyDirectory(src, dest) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const entries = fs.readdirSync(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        // Skip README files
        if (entry.name.toLowerCase() === 'readme.md') {
          console.log(`Skipping ${srcPath} (README file)`);
          continue;
        }

        if (entry.isDirectory()) {
          copyDirectory(srcPath, destPath);
        } else {
          console.log(`Copying ${srcPath} to ${destPath}`);
          let content = fs.readFileSync(srcPath, 'utf8');

          // Normalize import paths from plugin-clients to src/clients
          // Convert '../src/...' or '../../src/...' to correct relative path
          content = content.replace(/(from\s+['"](?:(?:\.\.\/)+))src\//g, '$1');

          fs.writeFileSync(destPath, content, 'utf8');
        }
      }
    }

    copyDirectory(pluginClientsDir, generatedClientsDir);
    console.log('Successfully copied plugin clients to src/clients.');

    // Update src/index.ts to export clients
    const srcIndexPath = path.join(__dirname, '../src/index.ts');
    if (fs.existsSync(srcIndexPath)) {
      console.log('Updating src/index.ts to export clients...');
      let srcIndexContent = fs.readFileSync(srcIndexPath, 'utf8');

      // Check if clients export already exists
      if (!srcIndexContent.includes('export * from "./clients"')) {
        srcIndexContent += 'export * from "./clients";\n';
        fs.writeFileSync(srcIndexPath, srcIndexContent, 'utf8');
        console.log('Added clients export to src/index.ts');
      } else {
        console.log('Clients export already exists in src/index.ts');
      }
    }
  }
} catch (error) {
  console.error('Error during post-generation script (plugin clients):', error);
  process.exit(1);
}
