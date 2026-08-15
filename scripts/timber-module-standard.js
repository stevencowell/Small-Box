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
