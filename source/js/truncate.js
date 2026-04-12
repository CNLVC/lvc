// Truncate post content on homepage to ~500 characters
document.addEventListener('DOMContentLoaded', function() {
  var posts = document.querySelectorAll('.post-body');
  posts.forEach(function(post) {
    var text = post.textContent;
    if (text.length > 500) {
      // Get all child nodes
      var children = Array.from(post.childNodes);
      var charCount = 0;
      var truncateIndex = -1;

      for (var i = 0; i < children.length; i++) {
        var node = children[i];
        if (node.nodeType === Node.TEXT_NODE) {
          charCount += node.textContent.length;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          charCount += node.textContent.length;
        }

        if (charCount >= 500) {
          truncateIndex = i;
          break;
        }
      }

      if (truncateIndex > 0) {
        // Remove nodes after truncate index
        for (var j = truncateIndex; j < children.length; j++) {
          post.removeChild(children[j]);
        }
        // Add ellipsis
        var ellipsis = document.createElement('span');
        ellipsis.style.cssText = 'color: #666; font-size: 14px;';
        ellipsis.textContent = '...';
        post.appendChild(ellipsis);
      }
    }
  });
});