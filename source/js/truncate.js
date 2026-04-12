// Truncate post content on homepage to ~500 characters
document.addEventListener('DOMContentLoaded', function() {
  // Only run on homepage (check for post-list class)
  var posts = document.querySelectorAll('.post-body');
  posts.forEach(function(post) {
    var text = post.textContent;
    if (text.length > 500) {
      // Find a good break point
      var truncated = text.substring(0, 500);
      var lastSpace = truncated.lastIndexOf(' ');
      var lastPunctuation = Math.max(
        truncated.lastIndexOf('。'),
        truncated.lastIndexOf('.'),
        truncated.lastIndexOf('!'),
        truncated.lastIndexOf('?')
      );
      
      var breakPoint = lastSpace;
      if (lastPunctuation > 400) {
        breakPoint = lastPunctuation + 1;
      }
      
      if (breakPoint < 300) {
        breakPoint = 500;
      }
      
      // Preserve HTML structure
      var html = post.innerHTML;
      var charCount = 0;
      var inTag = false;
      var inEntity = false;
      var truncateAt = -1;
      
      for (var i = 0; i < html.length && charCount < 500; i++) {
        var char = html[i];
        
        if (char === '<') {
          inTag = true;
        } else if (char === '>') {
          inTag = false;
        } else if (char === '&' && !inTag) {
          inEntity = true;
        } else if (char === ';' && inEntity) {
          inEntity = false;
          charCount++;
        } else if (!inTag && !inEntity) {
          charCount++;
          if (charCount >= 500 && breakPoint === 500) {
            truncateAt = i + 1;
          }
        }
        
        if (charCount >= 500) {
          // Find end of current word
          while (truncateAt === -1 && i < html.length) {
            var c = html[i];
            if (c === ' ' || c === '\n' || c === '<' || c === '.' || c === '。') {
              truncateAt = i + 1;
              break;
            }
            i++;
          }
          if (truncateAt === -1) truncateAt = i + 1;
          break;
        }
      }
      
      if (truncateAt > 0 && truncateAt < html.length) {
        post.innerHTML = html.substring(0, truncateAt) + '<span class="truncate-ellipsis">...</span>';
      }
    }
  });
});
