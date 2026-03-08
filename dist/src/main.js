import { cssVarsFor, themeTokens } from './theme.js';
import {
  renderGlobalSearch,
  renderFacetPanel,
  renderResultList,
  renderEvidenceTable,
  renderProvenanceSummary,
  renderProvenanceHistory,
  renderVisualizationShowcase,
  initHeaderSearch,
  initAptamerMultiSelect,
  initSecondaryStructureModule,
  initMolstarModule
} from './modules.js';
import {
  dataTypeCards,
  detailRecord,
  featuredRecords,
  portalMetrics,
  recentPublications,
  siteSummaries,
  stageDiseaseCards
} from './data.js';
import { normalizeRoute, routeFromHash } from './router.js';

const routes = ['home', 'browse', 'detail'];
let route = routeFromHash(window.location.hash);
let theme = 'blue';
let mode = 'light';

function setTheme(themeKey, modeKey) {
  const styleTag = document.getElementById('theme-vars') ?? document.createElement('style');
  styleTag.id = 'theme-vars';
  styleTag.textContent = `:root { ${cssVarsFor(themeKey, modeKey)} }`;
  document.head.appendChild(styleTag);
  document.body.setAttribute('data-mode', modeKey);
}

function nav() {
  return `<header>
    <div class="black-nav" aria-label="GZNL global navigation">
      <a href="http://www.gznl.org/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/header/home.svg" alt=""/>Home</a>
      <a href="https://www.gznl.org/database/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/header/database.svg" alt=""/>Database</a>
      <a href="https://www.gznl.org/research/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/header/research.svg" alt=""/>Research</a>
      <a href="https://www.gznl.org/aboutus/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/header/aboutus.svg" alt=""/>About us</a>
      <a href="https://gzlab.ac.cn/" target="_blank" rel="noopener noreferrer"><img src="./src/assets/header/gznl2.svg" alt=""/>GZNL-RDC</a>
    </div>
    <div class="top-nav" id="C-NAV-001">
      <strong>C-SHELL-001 AppShell</strong>
      <nav>
        ${routes.map((r) => `<button class="nav-btn ${route === r ? 'active' : ''}" data-route="${r}" aria-current="${route === r ? 'page' : 'false'}">${r[0].toUpperCase()}${r.slice(1)}</button>`).join('')}
      </nav>
      <div class="theme-controls">
        <label>Color Theme
          <select id="theme-switcher">
            ${Object.entries(themeTokens).map(([key, value]) => `<option value="${key}" ${theme === key ? 'selected' : ''}>${value.label}</option>`).join('')}
          </select>
        </label>
        <label>Mode
          <select id="mode-switcher">
            <option value="light" ${mode === 'light' ? 'selected' : ''}>Light</option>
            <option value="dark" ${mode === 'dark' ? 'selected' : ''}>Dark</option>
          </select>
        </label>
      </div>
    </div>
  </header>`;
}

function parseMetricValue(raw) {
  const text = String(raw).trim();
  const multiplier = text.endsWith('M') ? 1_000_000 : text.endsWith('K') ? 1_000 : 1;
  const numeric = Number(text.replace(/[^\d.]/g, '')) * multiplier;
  return Number.isFinite(numeric) ? Math.round(numeric) : 0;
}

function formatAnimatedValue(target, original) {
  const text = String(original).trim();
  if (text.endsWith('M')) return `${(target / 1_000_000).toFixed(1)}M`;
  if (text.endsWith('K')) return `${(target / 1_000).toFixed(1)}K`;
  return target.toLocaleString();
}

function initAnimatedStats() {
  const nodes = Array.from(document.querySelectorAll('[data-animate-number="true"]'));
  const duration = 1200;

  nodes.forEach((node) => {
    if (node.dataset.animated === 'true') return;
    const target = Number(node.dataset.target || '0');
    const original = node.dataset.original || '0';
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      node.textContent = formatAnimatedValue(value, original);
      if (t < 1) requestAnimationFrame(tick);
      else {
        node.textContent = original;
        node.dataset.animated = 'true';
      }
    }

    requestAnimationFrame(tick);
  });
}

function renderFooter() {
  return `<footer class="black-footer">
    <div class="black-footer-inner">
      <span>© Guangzhou National Laboratory</span>
      <span class="sep">|</span>
      <a href="http://www.gznl.org/" target="_blank" rel="noopener noreferrer">Home</a>
      <a href="https://www.gznl.org/database/" target="_blank" rel="noopener noreferrer">Database</a>
      <a href="https://www.gznl.org/research/" target="_blank" rel="noopener noreferrer">Research</a>
      <a href="https://www.gznl.org/aboutus/" target="_blank" rel="noopener noreferrer">About us</a>
      <a href="https://gzlab.ac.cn/" target="_blank" rel="noopener noreferrer">GZNL-RDC</a>
    </div>
  </footer>`;
}

function homePage() {
  const activeThemeLabel = themeTokens[theme]?.label ?? 'Blue';
  return `<main class="page-home">
    <section class="hero card">
      <div>
        <h1>RNAcentre unified template</h1>
        <p>GZNL-style modern scientific portal: shared architecture, consistent visualization modules, and multi-theme + light/dark support.</p>
        <p><strong>Active visual theme:</strong> ${activeThemeLabel} (${mode})</p>
        <div class="actions"><button data-route="browse">Explore Datasets</button><button class="ghost" data-route="detail">Open Detail Example</button></div>
      </div>
      <div class="hero-metrics">
        ${portalMetrics.map((m) => `<div><strong data-animate-number="true" data-target="${parseMetricValue(m.value)}" data-original="${m.value}">0</strong><span>${m.label}</span></div>`).join('')}
      </div>
    </section>

    <section class="stats-grid">
      ${dataTypeCards.map((item) => `<article class="card"><h3>${item.name}</h3><p>${item.desc}</p><strong>${item.count}</strong></article>`).join('')}
    </section>

    <section class="card">
      <h2>Development / Condition overview</h2>
      <div class="stats-grid compact">
        ${stageDiseaseCards.map((item) => `<article class="mini-card"><strong>${item.name}</strong><span>${item.count}</span></article>`).join('')}
      </div>
    </section>

    <section class="card">
      <h2>Database portfolio</h2>
      <ul>
        ${siteSummaries.map((summary) => `<li><strong>${summary.site}</strong>: ${summary.scope} (${summary.records.toLocaleString()} records)</li>`).join('')}
      </ul>
    </section>

    ${renderVisualizationShowcase()}

    <section class="card">
      <h2>Highlighted records</h2>
      <ul>
        ${featuredRecords.map((record) => `<li>${record.id}: ${record.title} (confidence: ${record.confidence})</li>`).join('')}
      </ul>
    </section>

    <section class="card">
      <h2>Recent publications</h2>
      <ul>
        ${recentPublications.map((paper) => `<li>${paper.year} — ${paper.title} (${paper.doi})</li>`).join('')}
      </ul>
    </section>
    ${renderGlobalSearch()}
  </main>`;
}

function browsePage() {
  return `<main class="page-browse">
    <h1>Browse Datasets</h1>
    ${renderGlobalSearch()}
    <section class="grid two-col">${renderFacetPanel()}${renderResultList()}</section>
  </main>`;
}

function detailPage() {
  return `<main class="page-detail">
    <section class="card"><h1>C-ENTITY-001 Entity Header</h1><p>Entry ID: ${detailRecord.id} • Name: ${detailRecord.name} • Status: ${detailRecord.status}</p></section>
    <section class="card"><h2>Overview</h2><p>Organism: ${detailRecord.organism} • Family: ${detailRecord.family} • Updated: ${detailRecord.updated}</p><p>Sequence length: ${detailRecord.sequenceLength} nt • Context: ${detailRecord.genomicContext}</p></section>
    ${renderEvidenceTable()}
    ${renderProvenanceSummary()}
    ${renderProvenanceHistory()}
  </main>`;
}

function pageFor(name) {
  const safeRoute = normalizeRoute(name);
  if (safeRoute === 'browse') return browsePage();
  if (safeRoute === 'detail') return detailPage();
  return homePage();
}

function render(options = {}) {
  const { preserveScroll = false } = options;
  const previousScrollX = window.scrollX;
  const previousScrollY = window.scrollY;

  setTheme(theme, mode);
  document.getElementById('app').innerHTML = `${nav()}${pageFor(route)}${renderFooter()}`;

  initHeaderSearch();
  initAptamerMultiSelect();
  initSecondaryStructureModule();
  initMolstarModule();
  initAnimatedStats();

  document.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', () => {
      route = normalizeRoute(el.getAttribute('data-route'));
      window.location.hash = route;
    });
  });

  document.getElementById('theme-switcher').addEventListener('change', (e) => {
    theme = e.target.value;
    render({ preserveScroll: true });
  });

  document.getElementById('mode-switcher').addEventListener('change', (e) => {
    mode = e.target.value;
    render({ preserveScroll: true });
  });

  if (preserveScroll) {
    requestAnimationFrame(() => window.scrollTo(previousScrollX, previousScrollY));
  }
}

window.addEventListener('hashchange', () => {
  route = routeFromHash(window.location.hash);
  render();
});

render();
