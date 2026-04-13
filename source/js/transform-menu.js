// Transform Hexo-generated homepage to match static page style
(function() {
  // Only run on homepage
  if (!document.querySelector('.use-motion')) return;

  // Find the menu and transform it
  var menu = document.querySelector('ul.main-menu.menu, ul.menu');
  if (!menu) return;

  // Change class to match static page format
  menu.className = 'menu';
  menu.id = 'menu';

  // Transform each menu item to multi-line format with <br />
  var items = menu.querySelectorAll('li.menu-item');
  items.forEach(function(item) {
    var link = item.querySelector('a');
    var icon = item.querySelector('i');
    var text = link.childNodes[link.childNodes.length - 1].textContent.trim();

    // Clear the link
    link.innerHTML = '';

    // Re-add icon
    if (icon) {
      link.appendChild(icon);
      link.appendChild(document.createElement('br'));
    }

    // Re-add text node
    link.appendChild(document.createTextNode(text));

    // Fix icon class
    if (icon && icon.className.indexOf('menu-item-icon') === -1) {
      icon.className = icon.className.replace(/fa-(\w)/, 'fa-fw fa-$1').replace('fa ', 'fa ');
      // Ensure it has menu-item-icon class
      if (!icon.classList.contains('menu-item-icon')) {
        var newIcon = document.createElement('i');
        newIcon.className = 'menu-item-icon ' + icon.className;
        link.insertBefore(newIcon, link.firstChild);
        icon.remove();
      }
    }
  });

  // Remove main-menu class from parent if exists
  var mainMenu = document.querySelector('.main-menu');
  if (mainMenu) {
    mainMenu.classList.remove('main-menu');
  }
})();
