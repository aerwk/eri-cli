(function () {
  'use strict';

  // Links with data-video-overlay open their YouTube video full screen on the
  // page instead of navigating away. The click counts as a user gesture, so the
  // browser allows the embed to autoplay with sound. Without JS the href still works.
  const links = document.querySelectorAll('a[data-video-overlay]');
  if (!links.length) return;

  function videoId(href) {
    try {
      return new URL(href).searchParams.get('v');
    } catch (err) {
      return null;
    }
  }

  function open(id, trigger) {
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Video');

    const frame = document.createElement('iframe');
    frame.className = 'video-overlay-frame';
    frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
      '?autoplay=1&playsinline=1&rel=0';
    frame.title = 'Video';
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'video-overlay-close';
    close.setAttribute('aria-label', 'Close video');
    close.textContent = '×';

    function dismiss() {
      document.removeEventListener('keydown', onKey);
      overlay.remove();
      document.documentElement.classList.remove('video-overlay-open');
      trigger.focus();
    }

    function onKey(event) {
      if (event.key === 'Escape') dismiss();
    }

    close.addEventListener('click', dismiss);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) dismiss();
    });
    document.addEventListener('keydown', onKey);

    overlay.append(frame, close);
    document.body.append(overlay);
    document.documentElement.classList.add('video-overlay-open');
    close.focus();
  }

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      const id = videoId(link.href);
      if (!id) return;
      event.preventDefault();
      open(id, link);
    });
  });
})();
