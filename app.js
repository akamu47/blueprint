/**
 * blueprint for a Better Britain V2 — Main Application Script
 * Charts, navigation, chatbot, and scroll animations.
 */

// ─── API Configuration ───
const API = "__PORT_8000__".startsWith("__") ? "http://localhost:8000" : "__PORT_8000__";

// ─── Chart.js Global Configuration ───
Chart.defaults.color = 'rgba(255,255,255,0.7)';
Chart.defaults.borderColor = 'rgba(255,255,255,0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.pointStyle = 'circle';
Chart.defaults.plugins.legend.labels.padding = 16;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(10, 22, 40, 0.95)';
Chart.defaults.plugins.tooltip.titleColor = '#3B82F6';
Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(59,130,246,0.3)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.animation = { duration: 800, easing: 'easeOutQuart' };

const TEAL = '#3B82F6';
const TEAL_50 = 'rgba(59,130,246,0.5)';
const TEAL_20 = 'rgba(59,130,246,0.2)';
const BLUE = '#3B82F6';
const BLUE_50 = 'rgba(59,130,246,0.5)';
const BLUE_20 = 'rgba(59,130,246,0.2)';
const RED = '#EF4444';
const RED_50 = 'rgba(239,68,68,0.5)';
const AMBER = '#F59E0B';
const AMBER_50 = 'rgba(245,158,11,0.5)';
const PURPLE = '#8B5CF6';
const PURPLE_50 = 'rgba(139,92,246,0.5)';
const GREEN = '#22C55E';
const GREEN_50 = 'rgba(34,197,94,0.5)';
const WHITE_30 = 'rgba(255,255,255,0.3)';
const WHITE_10 = 'rgba(255,255,255,0.1)';

// ─── Chart Initialization ───
function initCharts() {

  // ═══ TRUST: Politicians "out for themselves" ═══
  const trustCtx = document.getElementById('chart-trust-politicians');
  if (trustCtx) {
    new Chart(trustCtx, {
      type: 'line',
      data: {
        labels: ['1944', '1972', '1986', '1994', '2000', '2005', '2009', '2014', '2019', '2021', '2024'],
        datasets: [{
          label: '"Out for themselves" %',
          data: [35, 38, 46, 52, 57, 56, 60, 48, 54, 63, 67],
          borderColor: RED,
          backgroundColor: RED_50,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: RED,
          borderWidth: 2.5
        }, {
          label: '"Almost never" trust gov %',
          data: [null, null, null, null, null, 23, 28, 26, 31, 35, 45],
          borderColor: AMBER,
          backgroundColor: AMBER_50,
          fill: false,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: AMBER,
          borderWidth: 2,
          borderDash: [5, 3]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: { beginAtZero: true, max: 80, grid: { color: WHITE_10 }, ticks: { callback: v => v + '%' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ═══ PROMISES VS DELIVERY ═══
  const promCtx = document.getElementById('chart-promises');
  if (promCtx) {
    new Chart(promCtx, {
      type: 'bar',
      data: {
        labels: [
          '300k Homes/yr',
          'NHS 18-Week',
          'Level Up North',
          'Social Care Cap',
          'Broadband 100%',
          'Net Zero Grid'
        ],
        datasets: [
          {
            label: 'Years Promised',
            data: [20, 10, 10, 13, 8, 6],
            backgroundColor: TEAL_50,
            borderColor: TEAL,
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Years Delivered',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: RED_50,
            borderColor: RED,
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        indexAxis: 'y',
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: ${ctx.formattedValue} years`
            }
          }
        },
        scales: {
          x: { beginAtZero: true, max: 25, grid: { color: WHITE_10 }, ticks: { callback: v => v + ' yrs' } },
          y: { grid: { display: false } }
        }
      }
    });
  }

  // ═══ DEBT EXPLOSION ═══
  const debtCtx = document.getElementById('chart-debt-explosion');
  if (debtCtx) {
    new Chart(debtCtx, {
      type: 'bar',
      data: {
        labels: ['2000', '2005', '2008', '2010', '2013', '2016', '2019', '2022', '2024', '2026'],
        datasets: [{
          label: 'Net Debt (£bn)',
          data: [310, 420, 530, 950, 1190, 1600, 1790, 2370, 2700, 2871],
          backgroundColor: function(context) {
            const idx = context.dataIndex;
            if (idx >= 8) return RED_50;
            if (idx >= 5) return AMBER_50;
            return TEAL_20;
          },
          borderColor: function(context) {
            const idx = context.dataIndex;
            if (idx >= 8) return RED;
            if (idx >= 5) return AMBER;
            return TEAL;
          },
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `£${ctx.formattedValue}bn` } }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: WHITE_10 }, ticks: { callback: v => '£' + (v >= 1000 ? (v/1000).toFixed(1) + 'tn' : v + 'bn') } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ═══ DEBT INTEREST VS KEY SPENDING ═══
  const debtSpendCtx = document.getElementById('chart-debt-vs-spending');
  if (debtSpendCtx) {
    new Chart(debtSpendCtx, {
      type: 'bar',
      data: {
        labels: ['Debt Interest', 'Education\n(schools)', 'Defence', 'Transport'],
        datasets: [{
          label: '£ billions (2025-26)',
          data: [111.2, 65.3, 61.7, 21.8],
          backgroundColor: [RED_50, PURPLE_50, BLUE_50, TEAL_20],
          borderColor: [RED, PURPLE, BLUE, TEAL],
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `£${ctx.formattedValue}bn` } }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: WHITE_10 }, ticks: { callback: v => '£' + v + 'bn' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ═══ G7 BUSINESS INVESTMENT ═══
  const g7Ctx = document.getElementById('chart-g7-investment');
  if (g7Ctx) {
    new Chart(g7Ctx, {
      type: 'bar',
      data: {
        labels: ['France', 'Canada', 'Japan', 'Germany', 'USA', 'Italy', 'UK'],
        datasets: [{
          label: 'Business Investment (% GDP)',
          data: [25.2, 23.5, 23.1, 22.0, 21.4, 20.8, 18.6],
          backgroundColor: [WHITE_30, WHITE_30, WHITE_30, WHITE_30, WHITE_30, WHITE_30, RED_50],
          borderColor: ['transparent','transparent','transparent','transparent','transparent','transparent', RED],
          borderWidth: [0,0,0,0,0,0,2],
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.8,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, max: 30, grid: { color: WHITE_10 } },
          y: { grid: { display: false } }
        }
      }
    });
  }

  // ═══ LSE LISTINGS ═══
  const lseCtx = document.getElementById('chart-lse-listings');
  if (lseCtx) {
    new Chart(lseCtx, {
      type: 'bar',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'Delistings',
            data: [52, 48, 55, 64, 78, 88],
            backgroundColor: RED_50,
            borderColor: RED,
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'New Listings',
            data: [36, 29, 41, 24, 23, 18],
            backgroundColor: TEAL_50,
            borderColor: TEAL,
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        plugins: { legend: { position: 'top' } },
        scales: {
          y: { beginAtZero: true, grid: { color: WHITE_10 } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ═══ ENERGY COSTS ═══
  const energyCtx = document.getElementById('chart-energy-costs');
  if (energyCtx) {
    new Chart(energyCtx, {
      type: 'bar',
      data: {
        labels: ['Finland', 'France', 'Sweden', 'USA', 'Germany', 'Italy', 'UK'],
        datasets: [{
          label: 'p/kWh',
          data: [4.37, 8.12, 6.54, 7.89, 15.21, 18.45, 25.33],
          backgroundColor: [TEAL_20, TEAL_20, TEAL_20, TEAL_20, AMBER_50, AMBER_50, RED_50],
          borderColor: [TEAL, TEAL, TEAL, TEAL, AMBER, AMBER, RED],
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: WHITE_10 }, ticks: { callback: v => v + 'p' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // ═══ HOMEOWNERSHIP ═══
  const homeCtx = document.getElementById('chart-homeownership');
  if (homeCtx) {
    new Chart(homeCtx, {
      type: 'line',
      data: {
        labels: ['1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025'],
        datasets: [{
          label: '% owning a home (20-39)',
          data: [52, 49, 44, 40, 36, 32, 28, 26],
          borderColor: RED,
          backgroundColor: 'rgba(239,68,68,0.08)',
          fill: true,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: RED,
          borderWidth: 2.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.6,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: false, min: 20, max: 60, grid: { color: WHITE_10 }, ticks: { callback: v => v + '%' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}


// ─── Navigation ───
function initNav() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks?.querySelectorAll('.nav-link') || [];

  // Scroll state
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('nav-scrolled', y > 60);
    }
    lastScroll = y;
  }, { passive: true });

  // Mobile toggle
  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle?.classList.remove('active');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(sec => observer.observe(sec));
}


// ─── Scroll Animations (IntersectionObserver fallback) ───
function initScrollAnimations() {
  if (CSS.supports && CSS.supports('animation-timeline', 'scroll()')) return;

  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    obs.observe(el);
  });
}


// ─── Chatbot ───
function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const close = document.getElementById('chatbotClose');
  const input = document.getElementById('chatbotInput');
  const send = document.getElementById('chatbotSend');
  const messages = document.getElementById('chatbotMessages');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const open = panel.classList.toggle('open');
    panel.setAttribute('aria-hidden', !open);
    if (open) input?.focus();
  });

  close?.addEventListener('click', () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });

  function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = `chatbot-message ${isUser ? 'chatbot-message--user' : 'chatbot-message-assistant'}`;
    const p = document.createElement('p');
    p.textContent = text;
    div.appendChild(p);
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function handleSend() {
    const text = input?.value?.trim();
    if (!text) return;

    addMessage(text, true);
    input.value = '';

    // Try API, fall back to static responses
    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      if (res.ok) {
        const data = await res.json();
        addMessage(data.response || data.reply || 'No response received.', false);
        return;
      }
    } catch (e) {
      // Fall through to static
    }

    // Static fallback
    const lower = text.toLowerCase();
    let reply;
    if (lower.includes('trust') || lower.includes('believe') || lower.includes('politician')) {
      reply = 'The blueprint documents a comprehensive trust collapse: 45% of the public "almost never" trust government (BSA 41, record high), while just 9% trust politicians to tell the truth (Ipsos). This is driven by the growing gap between promises and delivery — see Section 1, "The Crisis of Trust."';
    } else if (lower.includes('five') || lower.includes('change') || lower.includes('priority') || lower.includes('start')) {
      reply = 'Section 3 identifies five priority changes: (1) Fix How Government Delivers, (2) Build — Homes, Infrastructure, Planning, (3) Cheap, Clean, Secure Power, (4) Simplify Tax and Procurement, (5) Unlock Capital for Growth. Each includes specific reforms, costs, and a "what changes for you" section showing the real-life impact.';
    } else if (lower.includes('implementation') || lower.includes('gap') || lower.includes('delivery') || lower.includes('nothing changes')) {
      reply = 'Section 2 identifies five patterns of failure: the Planning Trap, Cost Estimation Failure, Political Cycle Disruption, the Rhetoric-Resource Gap, and Institutional Capacity Erosion. It proposes a Delivery Architecture including a statutory Delivery Unit, civil service reform, and anti-reversion transparency mechanisms.';
    } else if (lower.includes('tier') || lower.includes('debate') || lower.includes('ready')) {
      reply = 'Section 4 organises reforms into three tiers: Tier 1 (Ready to Go — delivery unit, planning fast-track, AI deployment), Tier 2 (Needs Design Work — IT/NI merger, National Investment Bank, energy reform), and Tier 3 (Long-Term Questions — triple lock, IHT abolition, constitutional reform). This honesty about readiness is deliberate.';
    } else if (lower.includes('debt') || lower.includes('borrow') || lower.includes('deficit') || lower.includes('interest')) {
      reply = 'National debt has reached \u00a32.87 trillion (Jan 2026) \u2014 approximately \u00a3102,000 per household, up from \u00a30.5 trillion in 2008. Debt interest alone costs \u00a3111.2 billion per year (OBR 2025-26 forecast), which is more than Britain spends on either education or defence. The OBR projects debt rising to 96.5% of GDP by 2028-29. This is the compound cost of low growth \u2014 and why restoring growth is the only sustainable solution.';
    } else if (lower.includes('productivity') || lower.includes('wage') || lower.includes('growth')) {
      reply = 'UK output per hour was only 2.4% above 2019 levels at end-2025. Average real wages are just 3.5% above 2009-10 levels after 14 years. The Resolution Foundation calculates workers earn \u00a311,000 less per year than they would under pre-2008 trends. If GDP had grown at the pre-2008 trend, national income would be ~20% higher \u2014 generating over \u00a3100bn in additional annual tax revenue without raising any rates.';
    } else if (lower.includes('housing') || lower.includes('home') || lower.includes('planning')) {
      reply = 'England has a 2 million+ home shortfall. The 300,000/year target has been pledged by every government since the 1950s — none has achieved it. Only 26% of 20-39 year olds now own a home. The blueprint proposes mandatory local plans, zonal allocation, and a 12-month consent fast-track.';
    } else if (lower.includes('ai') || lower.includes('intelligent state') || lower.includes('digital')) {
      reply = 'The Intelligent State chapter proposes AI deployment across all 17 government departments, generating £3.0bn annual savings and £8.6bn 10-year NPV. The £3.2bn investment achieves 2.7x ROI through managed attrition of 40,500 posts — no forced redundancies — and a GovAI Shared Services Centre.';
    } else if (lower.includes('tax') || lower.includes('simplif')) {
      reply = 'Britain\'s tax code exceeds 21,000 pages (Tolley\'s) with £33.9bn in annual compliance costs. The blueprint proposes merging Income Tax and National Insurance, replacing Business Rates with a land-value system, reforming CGT with taper relief, and a 50% code reduction target.';
    } else if (lower.includes('energy') || lower.includes('electricity') || lower.includes('power')) {
      reply = 'UK industrial electricity costs are 25.33p/kWh — 5.8x Finland (4.37p) and 125% above the EU-14 median. This structural disadvantage drives manufacturers overseas. The blueprint proposes CfD auction reform, SMR deployment on existing nuclear sites, community energy ownership, and a strategic reserve.';
    } else if (lower.includes('promise') || lower.includes('deliver') || lower.includes('fail')) {
      reply = 'The blueprint documents a systematic pattern of cross-party failure: the 300,000 homes/year target has been pledged for 20 years and never met. The NHS 18-week treatment target was last met in 2016. The Dilnot social care cap was legislated 13 years ago and has never had a single beneficiary. Levelling up saw the North-South wealth gap double. The pattern is bipartisan — both parties promise, neither delivers.';
    } else if (lower.includes('real life') || lower.includes('what changes') || lower.includes('means for me')) {
      reply = 'Every proposal in the blueprint includes a "what changes for you" section — translating policy into real impact: lower energy bills, a payslip you can understand, affordable homes in your area, a pension that will actually be enough. If a reform can\'t be explained in terms of wages, bills, housing, and pensions, it hasn\'t been thought through.';
    } else {
      reply = 'The blueprint covers four sections: (1) The Diagnosis — what is wrong with Britain\'s economy, housing, capital markets, and democratic trust; (2) The Implementation Gap — why nothing changes and how to fix it; (3) Five Changes to Start Now — government reform, planning, energy, tax, and capital; (4) The Debate — tiered priorities from ready-to-go to long-term questions. Ask about any specific topic for more detail.';
    }
    addMessage(reply, false);
  }

  send?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSend();
  });
}


// ─── Smooth Scroll ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = document.getElementById('navbar')?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}


// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initNav();
  initScrollAnimations();
  initChatbot();
  initSmoothScroll();
});
