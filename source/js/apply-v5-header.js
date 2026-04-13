// Apply v5-style header and sidebar to homepage
(function() {
  // Only run on homepage
  if (!window.location.pathname || window.location.pathname !== '/') return;

  // Wait for DOM to be ready
  function init() {
    fetch('/about/')
      .then(function(response) { return response.text(); })
      .then(function(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // Get header and sidebar from about page
        var aboutHeader = doc.querySelector('header#header');
        var aboutSidebar = doc.querySelector('aside#sidebar');

        // Get current header and sidebar
        var currentHeader = document.querySelector('header.header');
        var currentSidebar = document.querySelector('aside.sidebar');

        // Replace header
        if (aboutHeader && currentHeader) {
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

        // Fix paths
        document.querySelectorAll('header a[href], header img[src]').forEach(function(el) {
          var href = el.getAttribute('href');
          var src = el.getAttribute('src');
          if (href && href.startsWith('../')) el.setAttribute('href', href.replace('../', '/'));
          if (src && src.startsWith('../')) el.setAttribute('src', src.replace('../', '/'));
        });

        document.querySelectorAll('aside a[href], aside img[src]').forEach(function(el) {
          var href = el.getAttribute('href');
          var src = el.getAttribute('src');
          if (href && href.startsWith('../')) el.setAttribute('href', href.replace('../', '/'));
          if (src && src.startsWith('../')) el.setAttribute('src', src.replace('../', '/'));
        });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
