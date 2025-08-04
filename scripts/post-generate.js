const fs = require('fs');
const path = require('path');

// Directory containing custom model files
const customModelsDir = path.join(__dirname, '../custom-models');
// Generated models directory
const generatedModelsDir = path.join(__dirname, '../src/models');

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
      const processedContent = content
      .replace(
        /from\s+['"]\.\.\/src\/models\/([^'"]+)['"]/g,
        (_match, mod) => `from './${mod}'`
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
  console.error('Error during post-generation script:', error);
  process.exit(1);
}
