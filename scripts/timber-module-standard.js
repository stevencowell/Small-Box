document.querySelectorAll('.video-shell[data-video-id]').forEach((shell) => {
  const button = shell.querySelector('.video-play');
  if (!button) return;

  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${shell.dataset.videoId}?autoplay=1`;
    frame.title = shell.dataset.videoTitle || 'YouTube learning video';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    frame.allowFullscreen = true;
    shell.replaceChildren(frame);
  }, { once: true });
});

document.querySelectorAll('.lesson-visual img').forEach((image) => {
  const figure = image.closest('figure');
  if (!figure || figure.querySelector('.open-larger-link')) return;
  const link = document.createElement('a');
  link.className = 'open-larger-link screen-only';
  link.href = image.currentSrc || image.src;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Open larger';
  figure.append(link);
});
