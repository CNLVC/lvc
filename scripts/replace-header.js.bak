const fs = require('fs');
const path = require('path');

// Paths
const repoRoot = '/tmp/lvc-editor/temp-git';
const indexPath = path.join(repoRoot, 'public/index.html');
const aboutPath = path.join(repoRoot, 'public/about/index.html');

// Read files
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const aboutHtml = fs.readFileSync(aboutPath, 'utf8');

// Extract header from about page
const headerMatch = aboutHtml.match(/<header id="header"[\s\S]*?<\/header>/);
const sidebarMatch = aboutHtml.match(/<aside id="sidebar"[\s\S]*?<\/aside>/);

if (!headerMatch) {
  console.error('Could not find header in about page');
  process.exit(1);
}
if (!sidebarMatch) {
  console.error('Could not find sidebar in about page');
  process.exit(1);
}

const v5Header = headerMatch[0];
const v5Sidebar = sidebarMatch[0];

console.log('Found v5 header length:', v5Header.length);
console.log('Found v5 sidebar length:', v5Sidebar.length);

// Find the Hexo header - it starts with <header class="header"
// and ends with the first </header> after it
const hexoHeaderStart = '<header class="header"';
const hexoHeaderEnd = '</header>';

const startIdx = indexHtml.indexOf(hexoHeaderStart);
if (startIdx === -1) {
  console.error('Could not find Hexo header start');
  process.exit(1);
}

// Find the closing </header> after the start
let endIdx = indexHtml.indexOf(hexoHeaderEnd, startIdx);
if (endIdx === -1) {
  console.error('Could not find Hexo header end');
  process.exit(1);
}
endIdx += hexoHeaderEnd.length;

const hexoHeader = indexHtml.substring(startIdx, endIdx);
console.log('Found Hexo header length:', hexoHeader.length);

// Replace header
indexHtml = indexHtml.substring(0, startIdx) + v5Header + indexHtml.substring(endIdx);

// Now find and replace sidebar - it starts with <aside id="sidebar"
const hexoSidebarStart = '<aside id="sidebar" class="sidebar">';
const hexoSidebarEnd = '</aside>';

const sidebarStartIdx = indexHtml.indexOf(hexoSidebarStart);
if (sidebarStartIdx === -1) {
  console.error('Could not find Hexo sidebar start');
  process.exit(1);
}

let sidebarEndIdx = indexHtml.indexOf(hexoSidebarEnd, sidebarStartIdx);
if (sidebarEndIdx === -1) {
  console.error('Could not find Hexo sidebar end');
  process.exit(1);
}
sidebarEndIdx += hexoSidebarEnd.length;

const hexoSidebar = indexHtml.substring(sidebarStartIdx, sidebarEndIdx);
console.log('Found Hexo sidebar length:', hexoSidebar.length);

// Replace sidebar
indexHtml = indexHtml.substring(0, sidebarStartIdx) + v5Sidebar + indexHtml.substring(sidebarEndIdx);

// Fix paths in header and sidebar (../ -> /)
indexHtml = indexHtml.replace(/href="\.\.\//g, 'href="/');
indexHtml = indexHtml.replace(/src="\.\.\//g, 'src="/');

// Write back
fs.writeFileSync(indexPath, indexHtml);
console.log('Done replacing header and sidebar');
