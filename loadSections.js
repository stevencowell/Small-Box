// List of top-level sections to load. These match the IDs defined in index.html.
const sections = [
  'program',
  'syllabus',
  'assessment',
  'project-unit',
  'main-theory',
  'support-activities',
  'advanced-activities'
];

// Specify how many weekly pages exist for each content stream. The small box unit
// runs for three weeks, so each has three files. Adjust the values if you
// extend or shorten the program.
const weekCounts = {
  'main-theory': 3,
  'support-activities': 3,
  'advanced-activities': 3
};

/**
 * Load the static HTML content for each section. Files live in the
 * `sections/` directory and are named `<id>.html`.
 */
function loadSections() {
  return Promise.all(sections.map(id => {
    return fetch('sections/' + id + '.html')
      .then(resp => resp.text())
      .then(html => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      });
  }));
}

/**
 * Sequentially fetch and append weekly content. Each weekly page lives in a
 * subdirectory named after its stream (e.g. `sections/main-theory/week1.html`).
 * This function ensures weeks load in order.
 */
async function loadWeeks() {
  async function fetchWeekSequential(section, count) {
    const container = document.getElementById(section + '-weeks');
    if (!container) return;
    for (let i = 1; i <= count; i++) {
      const resp = await fetch(`sections/${section}/week${i}.html`);
      const html = await resp.text();
      const div = document.createElement('div');
      div.innerHTML = html;
      container.appendChild(div);
    }
  }
  const promises = [];
  for (const [section, count] of Object.entries(weekCounts)) {
    promises.push(fetchWeekSequential(section, count));
  }
  return Promise.all(promises);
}

// When the DOM is ready, fetch static and weekly content. Once loaded,
// initialise page navigation and quiz features.
document.addEventListener('DOMContentLoaded', () => {
  loadSections()
    .then(loadWeeks)
    .then(() => {
      if (typeof initPage === 'function') initPage();
      if (typeof initQuizFeatures === 'function') initQuizFeatures();
    });
});