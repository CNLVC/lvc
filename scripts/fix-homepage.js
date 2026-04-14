const fs = require('fs');

// Read the about page (which has correct v5 header/sidebar)
const aboutHtml = fs.readFileSync('public/about/index.html', 'utf8');
// Read the generated index page
const indexHtml = fs.readFileSync('public/index.html', 'utf8');

// Extract header from about page
const headerMatch = aboutHtml.match(/<header id="header"[\s\S]*?<\/header>\n\n\n/);
const sidebarMatch = aboutHtml.match(/<aside id="sidebar"[\s\S]*?<\/aside>\n\n\n/);

if (!headerMatch || !sidebarMatch) {
  console.error('Could not find header or sidebar in about page');
  process.exit(1);
}

let result = indexHtml;

// Replace header - find <header class="header" ... </header>\nconst headerPattern = /<header class="header"[\s\S]*?<\/header>\n\n\n/;
result = result.replace(headerPattern, headerMatch[0]);

// Replace sidebar - find <aside class="sidebar"> ... </aside>\nconst sidebarPattern = /<aside class="sidebar">[\s\S]*?<\/aside>\n\n\n/;
result = result.replace(sidebarPattern, sidebarMatch[0]);

// Fix relative paths
result = result.replace(/href="\.\.\//g, 'href="/');
result = result.replace(/src="\.\.\//g, 'src="/');

fs.writeFileSync('public/index.html', result);
console.log('Done replacing header and sidebar');
