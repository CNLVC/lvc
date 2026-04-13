// Transform homepage menu icons to match static page (NexT v5) style
document.addEventListener('DOMContentLoaded', function() {
  var menu = document.querySelector('ul.main-menu.menu');
  if (!menu) return;

  // Add id and class to match static page
  menu.id = 'menu';
  menu.className = 'menu';

  var items = menu.querySelectorAll('li.menu-item a');
  items.forEach(function(link) {
    var icon = link.querySelector('i');
    if (!icon) return;

    var text = link.textContent.trim();
    var faClass = icon.className; // e.g. "fa fa-home fa-fw"

    // Parse icon name - extract "home" from "fa fa-home fa-fw"
    var match = faClass.match(/fa-(\S+)/);
    var iconName = match ? match[1] : '';

    // Build new icon class like "menu-item-icon fa fa-fw fa-home"
    var newClass = 'menu-item-icon fa fa-fw fa-' + iconName;

    // Clear and rebuild link
    link.innerHTML = '';

    var newIcon = document.createElement('i');
    newIcon.className = newClass;
    link.appendChild(newIcon);
    link.appendChild(document.createElement('br'));
    link.appendChild(document.createTextNode(text));
  });
});
