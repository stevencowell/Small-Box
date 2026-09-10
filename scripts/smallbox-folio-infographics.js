(() => {
  const graphics = [
    ['Project brief and success criteria', 'sb-brief-source-chain-v3.png', 'Requirement: what must the box achieve? Authority: where is that detail confirmed? Evidence: what check will show the result? A photograph cannot supply missing specifications.', 'Link each success criterion to the teacher-confirmed brief and a check that will demonstrate the result.'],
    ['Planning, marking and layout', 'sb-card-02-v2.png'],
    ['WHS and workshop controls', 'sb-card-03-v2.png'],
    ['Timber inspection and material placement', 'sb-card-04-v2.png'],
    null, // Obsolete project graphic intentionally suppressed.
    ['Assembly and clamp control', 'sb-assembly-glue-control-v3.png', 'Before assembly: understand the dry fit and prepare the setup and product. During assembly: maintain alignment and recheck square. After assembly: protect the work and follow approved timing.', 'Record checks before, during and after assembly. Follow the teacher-approved setup and product directions for clamp arrangement, adhesive and timing.'],
    ['Surface preparation', 'sb-surface-inspection-v3.png', 'Inspect the whole surface. Clean: dust and residue checked. Even: faces, edges and form checked. Ready: unresolved defects addressed.', 'Use a systematic inspection route across the actual faces and edges. The grid represents areas to inspect, not parts or dividers to build.'],
    ['Finish quality controls', 'sb-card-08-v2.png'],
    ['Evidence flow and sequencing', 'sb-evidence-flow-v3.png', 'Before: show the issue and name the check. Change: record the approved correction and reason. After: repeat the check and record the result. Keep the actual order and acknowledge any unrecorded stage.', 'Connect each photograph or note to the decision it proves. Keep the real sequence and identify any evidence gap.'],
    ['Problem-solving and adjustment', 'sb-diagnosis-v3.png', 'Worked example. Observation: one corner does not seat consistently. Question: orientation, contact or another cause? Controlled test: make one approved change and repeat the same check. A symptom alone does not establish the cause.', 'Use this worked example to separate an observation from a possible cause. Record your own diagnosis, teacher-supported correction and recheck.'],
    ['PMI evaluation', 'sb-pmi-evaluation-v3.png', 'Plus: a criterion achieved and an observable strength. Minus: a specific limitation and evidence of its effect. Interesting: a worthwhile question and a testable next idea. Check body, access and finish for both options; add lid and hinge checks only if chosen.', 'Support your Plus, Minus and Interesting points with evidence from the version of the box you actually made.'],
    ['Reflection and transfer', 'sb-transfer-stop-check-v3.png', 'Notice movement, uncertainty or a changed condition. Stop and ask the teacher. Restart only after the control and authority are clear. A completed worksheet does not authorise equipment use.', 'One transferable routine: notice a changed condition, stop and ask, then restart when the control and authority are clear. Name another useful routine from your own build.']
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
        <img src="assets/folio/cards/${graphic[1]}" alt="${graphic[2] || `${graphic[0]} infographic`}" loading="lazy" decoding="async">
        <figcaption>${graphic[3] || 'Use this visual to support your evidence and explanation for this stage.'}</figcaption>
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
