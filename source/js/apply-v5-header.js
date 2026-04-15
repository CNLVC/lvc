// Apply v5-style header, sidebar-toggle, and sidebar to homepage
(function() {
  // Only run on homepage
  if (!window.location.pathname || window.location.pathname !== '/') return;

  function init() {
    fetch('/about/')
      .then(function(response) { return response.text(); })
      .then(function(html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // Get v5 elements from about page
        var aboutHeader = doc.querySelector('header#header');
        var aboutSidebarToggle = doc.querySelector('.sidebar-toggle');
        var aboutSidebar = doc.querySelector('aside#sidebar');

        // Get current elements in homepage
        var currentHeader = document.querySelector('header#header');
        var currentSidebarToggle = document.querySelector('.sidebar-toggle');
        var currentSidebar = document.querySelector('aside#sidebar');

        // Replace header content (keep the header element itself for schema.org attributes)
        if (aboutHeader && currentHeader) {
          var headerInner = aboutHeader.querySelector('.header-inner');
          if (headerInner) {
            currentHeader.innerHTML = headerInner.innerHTML;
          }
        }

        // Replace sidebar-toggle with v5 version
        if (aboutSidebarToggle && currentSidebarToggle && currentSidebarToggle.parentNode) {
          var newToggle = aboutSidebarToggle.cloneNode(true);
          currentSidebarToggle.parentNode.replaceChild(newToggle, currentSidebarToggle);
        }

        // Replace sidebar content (keep the aside element itself)
        if (aboutSidebar && currentSidebar) {
          var sidebarInner = aboutSidebar.querySelector('.sidebar-inner');
          if (sidebarInner) {
            currentSidebar.innerHTML = sidebarInner.innerHTML;
          }
        }

        // Fix relative paths in header
        document.querySelectorAll('#header a[href]', '#header img[src]').forEach(function(el) {
          var href = el.getAttribute('href');
          var src = el.getAttribute('src');
          if (href && href.startsWith('../')) el.setAttribute('href', href.replace('../', '/'));
          if (src && src.startsWith('../')) el.setAttribute('src', src.replace('../', '/'));
        });

        // Fix relative paths in sidebar
        document.querySelectorAll('#sidebar a[href]', '#sidebar img[src]').forEach(function(el) {
          var href = el.getAttribute('href');
          var src = el.getAttribute('src');
          if (href && href.startsWith('../')) el.setAttribute('href', href.replace('../', '/'));
          if (src && src.startsWith('../')) el.setAttribute('src', src.replace('../', '/'));
        });

        console.log('Applied v5 header and sidebar');
      })
      .catch(function(err) {
        console.error('Failed to apply v5 header/sidebar:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
