// Simple markdown renderer for blog posts
export const renderMarkdown = (markdown: string): string => {
  let html = markdown;

  // Convert markdown images ![alt](url) to HTML img tags
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0;" />');

  // Convert markdown headers ## to HTML h2
  html = html.replace(/^## (.*$)/gm, '<h2 style="color: #0080ff; margin: 1.5rem 0 1rem 0; font-size: 1.5rem;">$1</h2>');

  // Convert markdown headers ### to HTML h3
  html = html.replace(/^### (.*$)/gm, '<h3 style="color: #00bfff; margin: 1.2rem 0 0.8rem 0; font-size: 1.3rem;">$1</h3>');

  // Convert markdown bold **text** to HTML strong
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #0080ff;">$1</strong>');

  // Convert markdown italic *text* to HTML em
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Convert line breaks to HTML br tags
  html = html.replace(/\n/g, '<br>');

  // Convert double line breaks to paragraph breaks
  html = html.replace(/(<br>){2,}/g, '</p><p>');

  // Wrap in paragraph tags
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><br><\/p>/g, '');
  html = html.replace(/<p><\/p>/g, '');

  return html;
};

// Alternative: Convert markdown to HTML with better formatting
export const renderMarkdownAdvanced = (markdown: string): string => {
  let html = markdown;

  // Convert markdown images ![alt](url) to HTML img tags with better styling
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    console.log('Rendering image markdown:', { match, alt, url: url.substring(0, 100) + '...' });
    return `
      <div style="text-align: center; margin: 2rem 0;">
        <img 
          src="${url}" 
          alt="${alt}" 
          style="max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);" 
          onerror="console.error('Image failed to load:', this.src.substring(0, 100) + '...')"
        />
        ${alt ? `<p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem; margin-top: 0.5rem; font-style: italic;">${alt}</p>` : ''}
      </div>
    `;
  });

  // Convert markdown headers ## to HTML h2
  html = html.replace(/^## (.*$)/gm, '<h2 style="color: #0080ff; margin: 2rem 0 1rem 0; font-size: 1.8rem; text-shadow: 0 0 8px rgba(0, 128, 255, 0.4);">$1</h2>');

  // Convert markdown headers ### to HTML h3
  html = html.replace(/^### (.*$)/gm, '<h3 style="color: #00bfff; margin: 1.5rem 0 0.8rem 0; font-size: 1.4rem; text-shadow: 0 0 6px rgba(0, 191, 255, 0.4);">$1</h3>');

  // Convert markdown bold **text** to HTML strong
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #0080ff; font-weight: 600;">$1</strong>');

  // Convert markdown italic *text* to HTML em
  html = html.replace(/\*(.*?)\*/g, '<em style="color: #00bfff; font-style: italic;">$1</em>');

  // Convert line breaks to HTML br tags
  html = html.replace(/\n/g, '<br>');

  // Convert double line breaks to paragraph breaks
  html = html.replace(/(<br>){2,}/g, '</p><p>');

  // Wrap in paragraph tags
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><br><\/p>/g, '');
  html = html.replace(/<p><\/p>/g, '');

  return html;
};
