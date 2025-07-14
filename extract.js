const fs = require("fs");
const path = require("path");

// Simple zip extraction using node
const extractZip = async (zipPath) => {
  console.log(`Attempting to extract: ${zipPath}`);

  // Check if file exists
  if (!fs.existsSync(zipPath)) {
    console.log("Zip file not found at:", zipPath);
    return;
  }

  const fileSize = fs.statSync(zipPath).size;
  console.log(`File size: ${fileSize} bytes`);

  try {
    // Try using exec to run unzip if available
    const { execSync } = require("child_process");
    execSync(`unzip "${zipPath}"`, { stdio: "inherit" });
    console.log("Extracted successfully using unzip");
    return;
  } catch (e) {
    console.log("Unzip command failed:", e.message);
  }

  // Try Node.js approach without external dependencies
  try {
    console.log("Attempting Node.js extraction method...");

    // Install adm-zip if possible and extract
    try {
      const { execSync } = require("child_process");
      console.log("Installing adm-zip...");
      execSync("npm install adm-zip", { stdio: "inherit" });

      const AdmZip = require("adm-zip");
      const zip = new AdmZip(zipPath);
      zip.extractAllTo("./", true);
      console.log("Extracted successfully using adm-zip");
      return;
    } catch (e) {
      console.log("Could not install or use adm-zip:", e.message);
    }
  } catch (e) {
    console.log("Node.js extraction failed:", e.message);
  }

  console.log(
    "All extraction methods failed. Manual extraction may be needed.",
  );
  console.log(
    "The zip file contains the Node.js project that needs to be extracted to run npm install.",
  );
};

// Try both possible locations
const possiblePaths = [
  "fortress-investment-group (3).zip",
  "code/fortress-investment-group (3).zip",
];

let foundPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    foundPath = p;
    break;
  }
}

if (foundPath) {
  extractZip(foundPath);
} else {
  console.log("Zip file not found in any expected location");
  console.log("Looking for zip files...");
  // List any zip files in current directory
  const files = fs.readdirSync(".");
  const zipFiles = files.filter((f) => f.endsWith(".zip"));
  console.log("Found zip files:", zipFiles);
}
