// Font loader for Chrome compatibility
document.fonts.ready.then(() => {
  console.log('Fonts loaded');
});

// Try to load the font explicitly
const font = new FontFace('kenpixel', 'url(/fonts/kenpixel.ttf)');
font.load().then((loadedFont) => {
  document.fonts.add(loadedFont);
  console.log('Kenpixel font loaded successfully');
}).catch((error) => {
  console.error('Failed to load kenpixel font:', error);
});
