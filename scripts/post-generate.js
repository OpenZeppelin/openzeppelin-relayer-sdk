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

  files.forEach((file) => {
    if (file.endsWith('.ts')) {
      const source = path.join(customModelsDir, file);
      const destination = path.join(generatedModelsDir, file);

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
    }
  });

  console.log('Successfully processed and replaced generated models with custom ones.');
} catch (error) {
  console.error('Error during post-generation script:', error);
  process.exit(1);
}
