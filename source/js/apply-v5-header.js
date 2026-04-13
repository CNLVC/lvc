// Apply v5-style header and sidebar to homepage
// Fetch from about page and replace current header/sidebar
(function() {
  // Only run on homepage
  if (!window.location.pathname || window.location.pathname !== '/') return;

  // Get v5 header and sidebar from about page
  fetch('/about/')
    .then(function(response) { return response.text(); })
    .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      // Get header from about page
      var aboutHeader = doc.querySelector('header#header');
      var aboutSidebar = doc.querySelector('aside#sidebar');

      // Get current header and sidebar
      var currentHeader = document.querySelector('header.header');
      var currentSidebar = document.querySelector('aside.sidebar');

      // Replace header
      if (aboutHeader && currentHeader) {
        // Keep the body content but replace header
        var headerInner = aboutHeader.querySelector('.header-inner');
        if (headerInner) {
          currentHeader.innerHTML = headerInner.innerHTML;
        }
      }

      // Replace sidebar
      if (aboutSidebar && currentSidebar) {
        var sidebarInner = aboutSidebar.querySelector('.sidebar-inner');
        if (sidebarInner) {
          currentSidebar.innerHTML = sidebarInner.innerHTML;
        }
      }

      // Fix relative paths in the replaced content
      document.querySelectorAll('header a[href], header img[src]').forEach(function(el) {
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('../')) {
          el.setAttribute('href', el.getAttribute('href').replace('../', '/'));
        }
        if (el.tagName === 'IMG' && el.getAttribute('src') && el.getAttribute('src').startsWith('../')) {
          el.setAttribute('src', el.getAttribute('src').replace('../', '/'));
        }
      });

      document.querySelectorAll('aside a[href], aside img[src]').forEach(function(el) {
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('../')) {
          el.setAttribute('href', el.getAttribute('href').replace('../', '/'));
        }
        if (el.tagName === 'IMG' && el.getAttribute('src') && el.getAttribute('src').startsWith('../')) {
          el.setAttribute('src', el.getAttribute('src').replace('../', '/'));
        }
      });
    });
})();
