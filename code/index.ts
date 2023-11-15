import { format } from "prettier";
import { downloadTheme, fuseThemes, saturateTheme } from "./functions";
import { Theme } from "./models";

// variables
const themesToDownload = ["dark_vs", "dark_plus", "dark_modern"];
const tempFile = "default-dark-theme-vscode.json";
const finalFile = "../themes/Saturated Dark Modern-color-theme.json";

const start = new Date();
const msSinceStartInMs = () => (new Date().getTime() - start.getTime()).toString().padStart(3, " ");
console.log(`${msSinceStartInMs()}ms: Starting...`);

// download the themes
const darkThemes = await Promise.all(themesToDownload.map(downloadTheme));
console.log(`${msSinceStartInMs()}ms: Downloaded themes...`);

// fuse everything together
const theme: Theme = fuseThemes(...darkThemes);
console.log(`${msSinceStartInMs()}ms: Fused themes...`);

// write the theme to disk
await Bun.write(tempFile, await format(JSON.stringify(theme), { parser: "json" }));
console.log(`${msSinceStartInMs()}ms: Wrote theme...`);

// create a copy with saturated colors
const saturatedTheme = saturateTheme(theme);
console.log(`${msSinceStartInMs()}ms: Saturated colors...`);

// prettify the theme
const prettyFormat = await format(JSON.stringify(saturatedTheme), { parser: "json" });
console.log(`${msSinceStartInMs()}ms: Formatted theme...`);

// write the theme to disk
await Bun.write(finalFile, prettyFormat);
console.log(`${msSinceStartInMs()}ms: Wrote saturated theme...`);
