/**
 * Manifesto for a Better Britain — Main Application Script
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
Chart.defaults.plugins.tooltip.titleColor = '#00B4A0';
Chart.defaults.plugins.tooltip.bodyColor = '#ffffff';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(0,180,160,0.3)';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.animation = { duration: 800, easing: 'easeOutQuart' };

const TEAL = '#00B4A0';
const TEAL_50 = 'rgba(0,180,160,0.5)';
const TEAL_20 = 'rgba(0,180,160,0.2)';
const BLUE = '#3B82F6';
const BLUE_50 = 'rgba(59,130,246,0.5)';
const BLUE_20 = 'rgba(59,130,246,0.2)';
const RED = '#EF4444';
const RED_50 = 'rgba(239,68,68,0.5)';
const AMBER = '#F59E0B';
const AMBER_50 = 'rgba(245,158,11,0.5)';
const WHITE_30 = 'rgba(255,255,255,0.3)';
const WHITE_10 = 'rgba(255,255,255,0.1)';

// ─── Chart Initialization ───
function initCharts() {
  // G7 Business Investment
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
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, max: 30, grid: { color: WHITE_10 } },
          y: { grid: { display: false } }
        }
      }
    });
  }

  // LSE Listings Crisis
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
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: WHITE_10 } }
        }
      }
    });
  }

  // UK Productivity
  const prodCtx = document.getElementById('chart-productivity');
  if (prodCtx) {
    new Chart(prodCtx, {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
          {
            label: 'Actual',
            data: [100, 97.8, 99.1, 100.5, 101.0, 101.8, 102.4],
            borderColor: TEAL,
            backgroundColor: TEAL_20,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: TEAL
          },
          {
            label: 'Pre-2008 Trend',
            data: [100, 102.0, 104.0, 106.1, 108.2, 110.4, 112.6],
            borderColor: WHITE_30,
            borderDash: [6, 4],
            fill: false,
            tension: 0.4,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false } },
          y: { min: 95, grid: { color: WHITE_10 } }
        }
      }
    });
  }

  // Tax Burden
  const taxCtx = document.getElementById('chart-tax-burden');
  if (taxCtx) {
    new Chart(taxCtx, {
      type: 'line',
      data: {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
        datasets: [{
          label: 'Tax Burden (% GDP)',
          data: [33.0, 33.1, 33.5, 34.2, 35.0, 35.8, 36.4, 36.9, 37.3, 37.7, 38.1, 38.5],
          borderColor: AMBER,
          backgroundColor: 'rgba(245,158,11,0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: AMBER
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          annotation: {},
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { min: 32, max: 40, grid: { color: WHITE_10 } }
        }
      }
    });
  }

  // AI Savings
  const aiCtx = document.getElementById('chart-ai-savings');
  if (aiCtx) {
    new Chart(aiCtx, {
      type: 'bar',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'],
        datasets: [
          {
            label: 'Investment',
            data: [-0.8, -0.7, -0.6, -0.5, -0.3, -0.1, -0.1, -0.05, -0.05, 0],
            backgroundColor: RED_50,
            borderColor: RED,
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Savings',
            data: [0.2, 0.5, 1.0, 1.8, 2.4, 3.0, 3.0, 3.0, 3.0, 3.0],
            backgroundColor: TEAL_50,
            borderColor: TEAL,
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { stacked: false, grid: { display: false } },
          y: { grid: { color: WHITE_10 }, ticks: { callback: v => `£${v}bn` } }
        }
      }
    });
  }

  // AIM Market Decline
  const aimCtx = document.getElementById('chart-aim-decline');
  if (aimCtx) {
    new Chart(aimCtx, {
      type: 'line',
      data: {
        labels: ['2007', '2009', '2011', '2013', '2015', '2017', '2019', '2021', '2023', '2025'],
        datasets: [{
          label: 'AIM-Listed Companies',
          data: [1694, 1293, 1143, 1087, 1044, 950, 855, 815, 740, 679],
          borderColor: RED,
          backgroundColor: 'rgba(239,68,68,0.15)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: RED
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { min: 500, grid: { color: WHITE_10 } }
        }
      }
    });
  }

  // Young Homeownership
  const homeCtx = document.getElementById('chart-homeownership');
  if (homeCtx) {
    new Chart(homeCtx, {
      type: 'line',
      data: {
        labels: ['1996', '2000', '2004', '2008', '2012', '2016', '2020', '2024'],
        datasets: [{
          label: '20-39 Year Olds Owning a Home (%)',
          data: [54, 51, 47, 40, 35, 30, 28, 26],
          borderColor: BLUE,
          backgroundColor: BLUE_20,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: BLUE
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { min: 20, max: 60, grid: { color: WHITE_10 }, ticks: { callback: v => v + '%' } }
        }
      }
    });
  }

  // Energy Costs
  const energyCtx = document.getElementById('chart-energy-costs');
  if (energyCtx) {
    new Chart(energyCtx, {
      type: 'bar',
      data: {
        labels: ['UK', 'Germany', 'Italy', 'France', 'USA', 'Finland'],
        datasets: [{
          label: 'Industrial Energy Cost (p/kWh)',
          data: [25.33, 18.5, 16.2, 12.8, 7.5, 4.37],
          backgroundColor: [RED_50, AMBER_50, AMBER_50, WHITE_30, WHITE_30, TEAL_50],
          borderColor: [RED, AMBER, AMBER, 'transparent', 'transparent', TEAL],
          borderWidth: [2, 1, 1, 0, 0, 2],
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: WHITE_10 }, ticks: { callback: v => v + 'p' } }
        }
      }
    });
  }

  // Undersaving
  const saveCtx = document.getElementById('chart-undersaving');
  if (saveCtx) {
    new Chart(saveCtx, {
      type: 'doughnut',
      data: {
        labels: ['Undersaving (14.6m)', 'Adequate Savings (19.4m)'],
        datasets: [{
          data: [14.6, 19.4],
          backgroundColor: [RED_50, TEAL_50],
          borderColor: ['#0A1628', '#0A1628'],
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }
}

// ─── Navigation ───
function initNavigation() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('nav-links-open');
      toggle.classList.toggle('nav-toggle-active');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    links.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('nav-links-open');
        toggle.classList.remove('nav-toggle-active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky nav background on scroll
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('nav-link-active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-20% 0px -80% 0px' });
  sections.forEach(section => observer.observe(section));
}

// ─── Chatbot ───
function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const close = document.getElementById('chatbotClose');
  const input = document.getElementById('chatbotInput');
  const send = document.getElementById('chatbotSend');
  const messages = document.getElementById('chatbotMessages');
  let history = [];

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    panel.classList.toggle('chatbot-panel-open');
    panel.setAttribute('aria-hidden', !panel.classList.contains('chatbot-panel-open'));
    if (panel.classList.contains('chatbot-panel-open')) {
      toggle.style.display = 'none';
      input.focus();
    }
  });

  close.addEventListener('click', () => {
    panel.classList.remove('chatbot-panel-open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.style.display = '';
  });

  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `chatbot-message chatbot-message-${role}`;
    div.innerHTML = `<p>${text}</p>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage('user', escapeHtml(text));
    history.push({ role: 'user', content: text });

    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'chatbot-message chatbot-message-assistant chatbot-typing';
    typing.innerHTML = '<p><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history.slice(-10) })
      });
      const data = await res.json();
      typing.remove();
      const reply = data.reply || data.error || 'Sorry, I encountered an error.';
      addMessage('assistant', formatMarkdown(reply));
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      typing.remove();
      addMessage('assistant', 'Sorry, I\'m unable to connect to the research assistant right now. Please try again later.');
    }
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatMarkdown(text) {
  // Simple markdown: bold, links, line breaks
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\n/g, '<br>');
}

// ─── Scroll Animation Fallback (for browsers without scroll-driven animations) ───
function initScrollAnimations() {
  if (CSS.supports && CSS.supports('animation-timeline', 'scroll()')) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

// ─── KPI Number Animation ───
function initKPIAnimation() {
  const kpis = document.querySelectorAll('.kpi-value');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('kpi-animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  kpis.forEach(kpi => observer.observe(kpi));
}

// ─── Initialize Everything ───
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCharts();
  initChatbot();
  initScrollAnimations();
  initKPIAnimation();
});
