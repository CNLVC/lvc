const fs = require('fs');
const path = require('path');

// Paths
const indexPath = path.join(__dirname, 'public/index.html');
const aboutPath = path.join(__dirname, 'public/about/index.html');

// Read files
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const aboutHtml = fs.readFileSync(aboutPath, 'utf8');

// Extract header from about page
const headerMatch = aboutHtml.match(/<header id="header"[\s\S]*?<\/header>\n/);
const sidebarMatch = aboutHtml.match(/<aside id="sidebar"[\s\S]*?<\/aside>/);

if (!headerMatch || !sidebarMatch) {
  console.error('Could not find header or sidebar in about page');
  process.exit(1);
}

const v5Header = headerMatch[0];
const v5Sidebar = sidebarMatch[0];

// Find and replace header in index.html
// The Hexo header looks like: <header class="header" itemscope...>...</header>
// But the v5 header has id="header"

indexHtml = indexHtml.replace(/<header class="header"[\s\S]*?<\/header>\n\n\n/, v5Header + '\n\n\n');

// Find and replace sidebar in index.html
// The Hexo sidebar looks like: <aside class="sidebar">...</aside>
indexHtml = indexHtml.replace(/<aside class="sidebar">[\s\S]*?<\/aside>/, v5Sidebar);

// Fix paths in header and sidebar (../images -> /images, etc)
indexHtml = indexHtml.replace(/href="\.\.\//g, 'href="/');
indexHtml = indexHtml.replace(/src="\.\.\//g, 'src="/');

// Write back
fs.writeFileSync(indexPath, indexHtml);
console.log('Done replacing header and sidebar');
