hexo.extend.filter.register('before_post_render', function(data) {
  // Only process posts, not pages
  if (data.layout !== 'post') {
    return data;
  }
  
  // Check if post already has a more tag
  if (data.content.includes('<!-- more -->')) {
    return data;
  }
  
  // Add more tag after approximately 500 characters
  const maxChars = 500;
  let content = data.content;
  
  if (content.length > maxChars) {
    // Find a good break point (end of sentence or paragraph)
    let breakPoint = content.indexOf('\n\n', maxChars);
    if (breakPoint === -1 || breakPoint > maxChars + 200) {
      // Find last period or question/exclamation mark before maxChars
      breakPoint = content.lastIndexOf('。', maxChars);
      if (breakPoint === -1 || breakPoint < maxChars - 100) {
        breakPoint = content.lastIndexOf('.', maxChars);
      }
      if (breakPoint === -1 || breakPoint < maxChars - 100) {
        breakPoint = content.lastIndexOf(' ', maxChars);
      }
      if (breakPoint === -1 || breakPoint < maxChars - 50) {
        breakPoint = maxChars;
      } else {
        breakPoint = breakPoint + 1; // Include the punctuation
      }
    }
    
    // Only add more tag if there's significant content after
    if (content.length - breakPoint > 100) {
      data.content = content.substring(0, breakPoint) + '\n\n<!-- more -->\n\n' + content.substring(breakPoint);
    }
  }
  
  return data;
});
