(() => {
  const graphics = [
    ['Project brief and success criteria', 'sb-card-01.png'],
    ['Planning, marking and layout', 'sb-card-02.png'],
    ['WHS and workshop controls', 'sb-card-03.png'],
    ['Timber inspection and material placement', 'sb-card-04.png'],
    ['Joints and divider fitting', 'sb-card-05.png'],
    ['Assembly and clamp control', 'sb-card-06.png'],
    ['Surface preparation', 'sb-card-07.png'],
    ['Finish quality controls', 'sb-card-08.png'],
    ['Evidence flow and sequencing', 'sb-card-09.png'],
    ['Problem-solving and adjustment', 'sb-card-10.png'],
    ['PMI evaluation', 'sb-card-11.png'],
    ['Reflection and transfer', 'sb-card-12.png']
  ];

  function addInfographics() {
    const cards = document.querySelectorAll('#folioCards .folio-card');
    cards.forEach((card, index) => {
      const graphic = graphics[index];
      const target = card.querySelector('.folio-meta');
      if (!graphic || !target || card.querySelector('.folio-card-graphic')) return;

      const figure = document.createElement('figure');
      figure.className = 'folio-card-graphic';
      figure.innerHTML = `
        <img src="assets/folio/cards/${graphic[1]}" alt="${graphic[0]} infographic" loading="lazy" decoding="async">
        <figcaption>Use this visual to support your evidence and explanation for this stage.</figcaption>
      `;
      target.insertAdjacentElement('afterend', figure);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(addInfographics));
  } else {
    requestAnimationFrame(addInfographics);
  }
})();
