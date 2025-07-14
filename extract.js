const fs = require("fs");
const path = require("path");

// Simple zip extraction using node
const extractZip = (zipPath) => {
  try {
    // Try using exec to run unzip if available
    const { execSync } = require("child_process");
    execSync(`unzip "${zipPath}"`, { stdio: "inherit" });
    console.log("Extracted successfully");
  } catch (e) {
    console.log("Unzip failed:", e.message);

    // Try alternative methods
    try {
      const yauzl = require("yauzl");
      console.log("Using yauzl...");
    } catch (e) {
      console.log("No zip libraries available. Manual extraction needed.");
      console.log("Zip file exists at:", zipPath);
      console.log("Size:", fs.statSync(zipPath).size, "bytes");
    }
  }
};

extractZip("fortress-investment-group (3).zip");
