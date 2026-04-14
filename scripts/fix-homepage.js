const fs = require('fs');

// Read the about page (which has correct v5 header/sidebar)
const aboutHtml = fs.readFileSync('public/about/index.html', 'utf8');
// Read the generated index page
const indexHtml = fs.readFileSync('public/index.html', 'utf8');

// Extract header from about page - match from opening tag to first closing </header>
const headerMatch = aboutHtml.match(/<header id="header"[\s\S]*?<\/header>/);
const sidebarMatch = aboutHtml.match(/<aside id="sidebar"[\s\S]*?<\/aside>/);

if (!headerMatch || !sidebarMatch) {
  console.error('Could not find header or sidebar in about page');
  process.exit(1);
}

let result = indexHtml;

// Replace header - find <header class="header" ... </header>
const headerPattern = /<header class="header"[\s\S]*?<\/header>/;
result = result.replace(headerPattern, headerMatch[0]);

// Replace sidebar - find <aside id="sidebar"> ... </aside>
const sidebarPattern = /<aside id="sidebar"[\s\S]*?<\/aside>/;
result = result.replace(sidebarPattern, sidebarMatch[0]);

// Fix relative paths
result = result.replace(/href="\.\.\//g, 'href="/');
result = result.replace(/src="\.\.\//g, 'src="/');

fs.writeFileSync('public/index.html', result);
console.log('Done replacing header and sidebar');
