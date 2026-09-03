const defaults = {
  html: document.querySelector('#html-input').value,
  css: document.querySelector('#css-input').value,
  js: document.querySelector('#js-input').value
};

const presets = [
  ['Carbon', '#f1efe6', '#a4a49b', '#d4b45d', '#101311'],
  ['Arctic', '#e8f5f7', '#8ca9ae', '#4db7c5', '#102124'],
  ['Forest', '#e4f0df', '#8ba18a', '#8fba68', '#101b14'],
  ['Ocean', '#dceeff', '#84a8c2', '#4e9bd1', '#0c1828'],
  ['Cobalt', '#e5eaff', '#97a4c7', '#7187ed', '#10162c'],
  ['Violet', '#f0e7ff', '#ad9cc4', '#b476e8', '#1a1225'],
  ['Rose', '#ffe9ee', '#bd929e', '#ee718d', '#251217'],
  ['Coral', '#fff0e8', '#be9a88', '#e98562', '#281813'],
  ['Amber', '#fff1ce', '#b8a06b', '#f0aa3c', '#241b0c'],
  ['Citrus', '#f4f4d7', '#a8ac79', '#c6d447', '#1a1d0e'],
  ['Mint', '#ddf5e9', '#83aa98', '#57c999', '#0c211a'],
  ['Teal', '#d9f3ef', '#7fa9a6', '#45c5b6', '#0b201f'],
  ['Copper', '#f5e2d5', '#ae9183', '#c8784c', '#241612'],
  ['Sunset', '#ffe4c7', '#bd8e78', '#f27550', '#291512'],
  ['Cherry', '#ffe1e6', '#ba8290', '#e84668', '#280e16'],
  ['Moss', '#e7edc9', '#9da77d', '#b4c655', '#18200e'],
  ['Lavender', '#ece8ff', '#a49cbd', '#9585e6', '#17142a'],
  ['Mono', '#f4f4f4', '#999999', '#ffffff', '#080808'],
  ['Slate', '#e2e8ed', '#8d9aa5', '#aebdca', '#151b20'],
  ['Paper', '#28251f', '#aaa396', '#f0c878', '#f2ead8']
].map(([name, clock, date, meta, background], index) => ({
  name,
  css: `.clock { color: ${clock}; }\n.date { color: ${date}; }\n.meta { color: ${meta}; }\n#aod-screen { background: ${background}; }`,
  animatedCss: `.clock { color: ${clock}; }\n.date { color: ${date}; }\n.meta { color: ${meta}; }\n#aod-screen { background: radial-gradient(circle at 18% 22%, ${clock}55, transparent 42%), linear-gradient(135deg, ${background}, #080b10); background-size: 180% 180%; animation: backgroundShift ${7 + index % 9}s ease-in-out infinite; }`
}));

const backgroundNames = ['Aurora Mint', 'Aurora Rose', 'Deep Ocean', 'Blue Hour', 'Solar Flare', 'Ember Field', 'Forest Mist', 'Neon Garden', 'Violet Night', 'Electric Lilac', 'Coral Reef', 'Tangerine', 'Lemon Glow', 'Cyan Grid', 'Magenta Grid', 'Emerald Grid', 'Amber Grid', 'Soft Clouds', 'Pink Clouds', 'Desert Sky', 'Polar Sky', 'Ink Bloom', 'Plum Bloom', 'Copper Waves', 'Silver Waves', 'Gold Waves', 'Red Velvet', 'Blue Velvet', 'Green Velvet', 'Retro Peach', 'Retro Aqua', 'Retro Lilac', 'Matrix', 'Terminal', 'Laser Red', 'Laser Blue', 'Laser Gold', 'Constellation', 'Stardust', 'Moonlight', 'Red Moon', 'Opal', 'Prism', 'Monochrome', 'Paper Shadow', 'Moss Stone', 'Night Drive', 'City Lights', 'Volcanic', 'Glacier'];
const backgroundColors = ['#0e574e,#122c54', '#743e67,#251638', '#167087,#071625', '#303777,#0b132f', '#ff9e42,#6c1d23', '#7d2d20,#160b0b', '#366f4d,#0a1a16', '#087f70,#071b18', '#784ab0,#17102d', '#8d5bc4,#20113c', '#1b8785,#112a39', '#ffbd55,#b03928', '#b7d73f,#284d28', '#103b47,#07171e', '#5b1d52,#1c0c22', '#1a684f,#071c1a', '#684c1a,#1c1508', '#839fbd,#101826', '#d7769c,#21152e', '#d49062,#344e6f', '#69adb0,#142a49', '#3540a0,#090b20', '#d45b88,#180d24', '#cd7345,#351918', '#a8c3c6,#1a2930', '#d6ad4f,#30220e', '#9d203a,#19090e', '#1c5592,#08101d', '#187052,#061711', '#e97762,#522642', '#50c2b1,#1b3750', '#a17cc7,#28204d', '#0b301a,#031008', '#123d24,#05110a', '#4c101b,#08090d', '#103b62,#08090d', '#6a4c17,#0d0b08', '#b7d4e8,#080f1e', '#e5b5dd,#1b0e28', '#f0e5b1,#101d36', '#e57858,#220e19', '#e890ad,#7ac6cf', '#ec6e8d,#5e9de1', '#505050,#080808', '#d9cdb8,#22201d', '#718064,#111612', '#a12c42,#080b13', '#e8b949,#111522', '#f36a27,#190b0c', '#d8f4ef,#172a4c'];
const backgrounds = backgroundNames.map((name, index) => ({
  name,
  css: `#aod-screen { background: linear-gradient(135deg, ${backgroundColors[index].replace(',', ', ')}, #080b10); background-size: 220% 220%; animation: backgroundShift ${8 + index % 10}s ease-in-out infinite; }`
}));

const widgetCatalog = [
  ['greeting', 'greeting'], ['steps', 'steps'], ['calendar', 'calendar'],
  ['quote', 'quote'], ['focus', 'focus'], ['location', 'location'],
  ['sunrise', 'sunrise'], ['network', 'network'], ['music-wave', 'musicWave']
];
let simpleWidgets = ['clock', 'date', 'weather', 'battery'];

const elements = {
  html: document.querySelector('#html-input'),
  css: document.querySelector('#css-input'),
  js: document.querySelector('#js-input'),
  preview: document.querySelector('#preview-content'),
  screen: document.querySelector('#aod-screen'),
  error: document.querySelector('#error'),
  saved: document.querySelector('#saved-state'),
  website: document.querySelector('#website-input'),
  embedError: document.querySelector('#embed-error'),
  simpleControls: document.querySelector('#simple-controls'),
  advancedControls: document.querySelector('#advanced-controls'),
  simpleMode: document.querySelector('#simple-mode'),
  advancedMode: document.querySelector('#advanced-mode'),
  clockToggle: document.querySelector('#clock-toggle'),
  dateToggle: document.querySelector('#date-toggle'),
  weatherToggle: document.querySelector('#weather-toggle'),
  batteryToggle: document.querySelector('#battery-toggle'),
  sizeSlider: document.querySelector('#size-slider'),
  sizeOutput: document.querySelector('#size-output'),
  opacitySlider: document.querySelector('#opacity-slider'),
  opacityOutput: document.querySelector('#opacity-output'),
  backgroundSelect: document.querySelector('#background-select'),
  videoInput: document.querySelector('#video-input'),
  videoName: document.querySelector('#video-name')
};

const presetSelect = document.querySelector('#preset-select');
const timezoneSelect = document.querySelector('#timezone-select');
const timezoneDetected = document.querySelector('#timezone-detected');
const clockFormatSelect = document.querySelector('#clock-format');
const supportedTimezones = typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : ['UTC', 'Europe/Berlin', 'Europe/London', 'America/New_York', 'America/Los_Angeles', 'Asia/Tokyo', 'Australia/Sydney'];
supportedTimezones.forEach((zone) => {
  const option = document.createElement('option');
  option.value = zone;
  option.textContent = zone.replaceAll('_', ' ');
  timezoneSelect.appendChild(option);
});
if (!supportedTimezones.includes(timezone)) timezone = systemTimezone;
timezoneSelect.value = timezone;
clockFormatSelect.value = clockFormat;
const presetOptions = presets.flatMap((preset) => [
  { name: `${preset.name} · Still`, css: preset.css },
  { name: `${preset.name} · Animated`, css: preset.animatedCss }
]);
let backgroundCss = '';
let videoUrl = '';
let advancedMode = false;
let uiTheme = 'paper';
let currentLanguage = 'en';
const systemTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
let timezone = localStorage.getItem('aod-timezone') || systemTimezone;
let clockFormat = localStorage.getItem('aod-clock-format') || '24';
const importedThemes = [];
const translations = {
  en: {
    editor: 'Editor', themes: 'Themes', settings: 'Settings', liveCanvas: 'LIVE CANVAS', saved: 'Saved',
    designSystem: 'DESIGN SYSTEM', display: 'Your display.', description: 'Shape every piece of information with the web stack you already know.',
    simple: 'Simple', advanced: 'Advanced', widgets: 'WIDGETS', moreWidgets: 'MORE WIDGETS', website: 'EMBED WEBSITE', presets: 'PRESETS', backgrounds: 'ANIMATED BACKGROUND', localVideo: 'LOCAL VIDEO',
    apply: 'Apply', reset: 'Reset', remove: 'Remove', removeDrop: 'Drop here to remove', fullscreen: 'Fullscreen', settingsTitle: 'Application settings.', settingsDescription: 'Choose the language for the AOD Studio interface.', languageLabel: 'LANGUAGE',
    export: 'Export', import: 'Import', themesTitle: 'Designs to share.', themeDescription: 'Export your current layout or import an AOD JSON from others.', secretTitle: 'Secret Themes.', secretDescription: 'Enter an unlock code to discover hidden looks.', emptyThemes: 'No imported AODs yet.', loaded: 'loaded.'
    ,greeting: 'Greeting', steps: 'Steps', calendar: 'Calendar', quote: 'Quote', focus: 'Focus', location: 'Location', sunrise: 'Sunrise', network: 'Network', musicWave: 'Music Wave', clockLabel: 'Clock', dateLabel: 'Date', weatherLabel: 'Weather', batteryLabel: 'Battery', weekday: 'TUESDAY', toggleState: 'ON / OFF', dragDrop: 'DRAG & DROP', clockSize: 'Clock size', opacity: 'Widget opacity', selectTheme: 'Choose a theme...', selectBackground: 'Choose a background...',
    goodMorning: 'Good morning', stepsLabel: 'STEPS', september: 'SEPTEMBER', quoteText: 'Today is a good day.', focusLabel: 'FOCUS', connected: 'CONNECTED', nowPlaying: 'NOW PLAYING', noVideo: 'No video selected', websiteLoaded: 'Website loaded', videoLoaded: 'Video loaded', invalidUrl: 'Please enter a URL starting with https:// or http://.', unknownCode: 'Code not recognized.', unlocked: 'unlocked.'
  },
  de: {
    editor: 'Editor', themes: 'Themes', settings: 'Einstellungen', liveCanvas: 'LIVE-VORSCHAU', saved: 'Gespeichert',
    designSystem: 'DESIGN SYSTEM', display: 'Dein Display.', description: 'Forme jede Information mit dem Web-Stack, den du schon kennst.',
    simple: 'Einfach', advanced: 'Erweitert', widgets: 'WIDGETS', moreWidgets: 'MEHR WIDGETS', website: 'WEBSITE EINBETTEN', presets: 'PRESETS', backgrounds: 'ANIMIERTER HINTERGRUND', localVideo: 'LOKALES VIDEO',
    apply: 'Anwenden', reset: 'Zurücksetzen', remove: 'Entfernen', removeDrop: 'Zum Entfernen hier ablegen', fullscreen: 'Vollbild', settingsTitle: 'App-Einstellungen.', settingsDescription: 'Wähle die Sprache für die AOD-Studio-Oberfläche.', languageLabel: 'SPRACHE',
    export: 'Exportieren', import: 'Importieren', themesTitle: 'Designs teilen.', themeDescription: 'Exportiere dein Layout oder importiere ein AOD-JSON von anderen.', secretTitle: 'Secret Themes.', secretDescription: 'Gib einen Freischaltcode ein, um versteckte Looks zu entdecken.', emptyThemes: 'Noch keine importierten AODs.', loaded: 'geladen.'
    ,greeting: 'Begrüßung', steps: 'Schritte', calendar: 'Kalender', quote: 'Zitat', focus: 'Fokus', location: 'Standort', sunrise: 'Sonnenaufgang', network: 'Netzwerk', musicWave: 'Music Wave', clockLabel: 'Uhr', dateLabel: 'Datum', weatherLabel: 'Wetter', batteryLabel: 'Akku', weekday: 'DIENSTAG', toggleState: 'AN / AUS', dragDrop: 'ZIEHEN & ABLEGEN', clockSize: 'Uhrgröße', opacity: 'Widget-Deckkraft', selectTheme: 'Theme auswählen...', selectBackground: 'Hintergrund auswählen...',
    goodMorning: 'Guten Morgen', stepsLabel: 'SCHRITTE', september: 'SEPTEMBER', quoteText: 'Heute ist ein guter Tag.', focusLabel: 'FOKUS', connected: 'VERBUNDEN', nowPlaying: 'NOW PLAYING', noVideo: 'Kein Video ausgewählt', websiteLoaded: 'Website geladen', videoLoaded: 'Video geladen', invalidUrl: 'Bitte eine URL mit https:// oder http:// eingeben.', unknownCode: 'Code nicht erkannt.', unlocked: 'freigeschaltet.'
  }
};
const secretThemes = {
  REDLINE: { format: 'zephtor.aod', version: 1, name: 'Redline Protocol', html: defaults.html, css: '.clock { color:#ff4d4d; } .date { color:#b97878; } .meta { color:#ff7777; } #aod-screen { background:#090909; }', js: defaults.js, uiTheme: 'developer' },
  NULLVOID: { format: 'zephtor.aod', version: 1, name: 'Null Void', html: defaults.html, css: '.clock { color:#f4f4f4; } .date { color:#737373; } .meta { color:#72d8c0; } #aod-screen { background:#000; }', js: defaults.js, uiTheme: 'dark' },
  SYNTHWAVE: { format: 'zephtor.aod', version: 1, name: 'Synthwave 84', html: defaults.html, css: '.clock { color:#ff75d8; } .date { color:#8fa7ff; } .meta { color:#62f5e8; } #aod-screen { background:#170d2c; }', js: defaults.js, uiTheme: 'developer' },
  F3MB0Y: { format: 'zephtor.aod', version: 1, name: 'Femboy Theme', html: defaults.html, css: '.clock { color:#ff8fbd; } .date { color:#d89ab8; } .meta { color:#9bd7ff; } #aod-screen { background:#321a35; }', js: defaults.js, uiTheme: 'dark' },
  FURRY: { format: 'zephtor.aod', version: 1, name: 'Furry Theme', html: defaults.html, css: '.clock { color:#ffb45c; } .date { color:#d98a5a; } .meta { color:#8ed3b0; } #aod-screen { background:#182c27; }', js: defaults.js, uiTheme: 'dark' }
};
 presetOptions.forEach((preset, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = preset.name;
  presetSelect.appendChild(option);
});

function widgetMarkup(type) {
  const markup = {
    clock: '<div class="clock widget-value">12:48</div>',
    date: `<div class="date widget-caption">${translations[currentLanguage].weekday}, 03. ${translations[currentLanguage].september}</div>`,
    weather: '<div class="meta widget-caption"><span>☼ 18° BERLIN</span></div>',
    battery: '<div class="meta widget-caption"><span>◒ 86%</span></div>',
    greeting: `<div class="widget-value">${translations[currentLanguage].goodMorning}</div>`,
    steps: `<div class="widget-value">7.842</div><div class="widget-caption">${translations[currentLanguage].stepsLabel}</div>`,
    calendar: `<div class="widget-value">03</div><div class="widget-caption">${translations[currentLanguage].september} 2026</div>`,
    quote: `<div class="widget-caption">${translations[currentLanguage].quoteText}</div>`,
    focus: `<div class="widget-value">25:00</div><div class="widget-caption">${translations[currentLanguage].focusLabel}</div>`,
    location: '<div class="widget-value">BERLIN</div><div class="widget-caption">52.52° N / 13.40° E</div>',
    sunrise: `<div class="widget-value">06:18</div><div class="widget-caption">${translations[currentLanguage].sunrise.toUpperCase()}</div>`,
    network: `<div class="widget-value">WLAN</div><div class="widget-caption">${translations[currentLanguage].connected}</div>`,
    'music-wave': `<div class="music-wave"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="widget-caption">${translations[currentLanguage].nowPlaying}</div>`
  };
  return markup[type] || '';
}

function renderSimpleWidgets() {
  const enabled = { clock: elements.clockToggle.checked, date: elements.dateToggle.checked, weather: elements.weatherToggle.checked, battery: elements.batteryToggle.checked };
  elements.preview.innerHTML = `<div class="widget-stack">${simpleWidgets.map((type, index) => ({ type, index })).filter(({ type }) => enabled[type] !== false).map(({ type, index }) => `<div class="widget-item" draggable="true" data-widget-index="${index}" data-widget-type="${type}">${widgetMarkup(type)}<button class="widget-remove" type="button" title="${translations[currentLanguage].remove}">×</button></div>`).join('')}</div>`;
}

function updateSimpleClock() {
  if (advancedMode || !simpleWidgets.includes('clock')) return;
  const clock = elements.preview.querySelector('.clock');
  if (clock) clock.textContent = new Date().toLocaleTimeString(currentLanguage, { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: clockFormat === '12' });
}

function applyDesign() {
  elements.error.textContent = '';
  if (advancedMode) elements.preview.innerHTML = elements.html.value;
  else renderSimpleWidgets();
  let customStyle = document.querySelector('#custom-preview-style');
  if (!customStyle) {
    customStyle = document.createElement('style');
    customStyle.id = 'custom-preview-style';
    document.head.appendChild(customStyle);
  }
  const simpleCss = `#preview-content { opacity: ${elements.opacitySlider.value / 100}; } .clock { font-size: ${elements.sizeSlider.value}px; } ${elements.clockToggle.checked ? '' : '.clock { display: none; }'} ${elements.dateToggle.checked ? '' : '.date { display: none; }'} ${elements.weatherToggle.checked ? '' : '.meta span:first-child { display: none; }'} ${elements.batteryToggle.checked ? '' : '.meta span:last-child { display: none; }'}`;
  customStyle.textContent = '#preview-content { width: 100%; } ' + backgroundCss + simpleCss + elements.css.value;
  try {
    if (advancedMode) Function(elements.js.value)();
    elements.saved.classList.add('is-updating');
    elements.saved.textContent = currentLanguage === 'de' ? 'Gerade aktualisiert' : 'Just updated';
    window.setTimeout(() => elements.saved.classList.remove('is-updating'), 300);
    window.setTimeout(() => { elements.saved.textContent = translations[currentLanguage].saved; }, 1600);
  } catch (error) {
    elements.error.textContent = `JS: ${error.message}`;
  }
}

function setMode(mode) {
  const advanced = mode === 'advanced';
  advancedMode = advanced;
  document.body.dataset.editMode = advanced ? 'advanced' : 'simple';
  elements.simpleControls.hidden = advanced;
  elements.advancedControls.hidden = !advanced;
  elements.simpleMode.classList.toggle('active', !advanced);
  elements.advancedMode.classList.toggle('active', advanced);
}

function addWidget(type, index = simpleWidgets.length) {
  simpleWidgets.splice(index, 0, type);
  applyDesign();
}

function moveWidget(from, to) {
  const [widget] = simpleWidgets.splice(from, 1);
  simpleWidgets.splice(Math.max(0, Math.min(to, simpleWidgets.length)), 0, widget);
  applyDesign();
}

function updateSliders() {
  elements.sizeOutput.value = `${elements.sizeSlider.value}px`;
  elements.sizeOutput.textContent = `${elements.sizeSlider.value}px`;
  elements.opacityOutput.value = `${elements.opacitySlider.value}%`;
  elements.opacityOutput.textContent = `${elements.opacitySlider.value}%`;
  applyDesign();
}

function translate(language) {
  const text = translations[language];
  currentLanguage = language;
  document.documentElement.lang = language;
  const ids = { 'editor-tab': 'editor', 'themes-tab': 'themes', 'settings-tab': 'settings', 'simple-mode': 'simple', 'advanced-mode': 'advanced', apply: 'apply', reset: 'reset', 'clear-video': 'remove', 'settings-title': 'settingsTitle', 'settings-description': 'settingsDescription', 'language-label': 'languageLabel' };
  Object.entries(ids).forEach(([id, key]) => { const node = document.querySelector(`#${id}`); if (node) node.textContent = text[key]; });
  document.querySelector('.section-heading .eyebrow').textContent = text.liveCanvas;
  document.querySelector('.saved').textContent = text.saved;
  document.querySelector('.editor-intro .eyebrow').textContent = text.designSystem;
  document.querySelector('.editor-intro h2').textContent = text.display;
  document.querySelector('.editor-intro p').textContent = text.description;
  document.querySelector('#remove-zone').textContent = text.removeDrop;
  document.querySelector('.topbar-actions span:not(.status-dot)').textContent = language === 'de' ? 'Lokale Vorschau' : 'Local preview';
  document.querySelector('#export-theme').childNodes[0].textContent = `${text.export} `;
  document.querySelector('.upload-label').childNodes[0].textContent = `${text.import} `;
  document.querySelector('#website-input').placeholder = language === 'de' ? 'https://beispiel.de' : 'https://example.com';
  document.querySelector('#secret-code').placeholder = language === 'de' ? 'CODE EINGEBEN' : 'ENTER CODE';
  const fieldLabels = document.querySelectorAll('#simple-controls > .field-label, .embed-row .field-label, .preset-row .field-label, .video-row .field-label');
  const fieldKeys = ['widgets', 'moreWidgets', 'website', 'presets', 'backgrounds', 'localVideo'];
  fieldLabels.forEach((label, index) => { if (text[fieldKeys[index]]) label.childNodes[0].textContent = text[fieldKeys[index]]; });
  document.querySelectorAll('.widget-tool').forEach((tool) => { tool.textContent = text[tool.dataset.widgetKey]; });
  document.querySelectorAll('.widget-toggles label span').forEach((label, index) => { label.textContent = text[['clockLabel', 'dateLabel', 'weatherLabel', 'batteryLabel'][index]]; });
  document.querySelector('.widget-toggles').previousElementSibling.childNodes[0].textContent = text.widgets;
  document.querySelector('.library-title').childNodes[0].textContent = text.moreWidgets;
  document.querySelector('.widget-toggles').previousElementSibling.querySelector('span').textContent = text.toggleState;
  document.querySelector('.library-title span').textContent = text.dragDrop;
  document.querySelectorAll('.slider-field span')[0].textContent = text.clockSize;
  document.querySelectorAll('.slider-field span')[1].textContent = text.opacity;
  document.querySelector('#preset-select option:first-child').textContent = text.selectTheme;
  document.querySelector('#background-select option:first-child').textContent = text.selectBackground;
  document.querySelector('#themes-view .theme-section:first-child .eyebrow').textContent = language === 'de' ? 'APP-LOOK' : 'APP LOOK';
  document.querySelectorAll('.ui-theme-card small')[0].textContent = language === 'de' ? 'Hell und ruhig' : 'Light and calm';
  document.querySelectorAll('.ui-theme-card small')[1].textContent = language === 'de' ? 'Kontrastreich' : 'High contrast';
  document.querySelectorAll('.ui-theme-card small')[2].textContent = language === 'de' ? 'Schwarz / Rot' : 'Black / red';
  if (!advancedMode) renderSimpleWidgets();
  document.querySelector('#themes-view .theme-section:first-child h3').textContent = language === 'de' ? 'Wähle deine Arbeitsumgebung.' : 'Choose your workspace look.';
  document.querySelector('#themes-view .theme-section:nth-child(2) h3').textContent = text.themesTitle;
  document.querySelector('#themes-view .theme-section:nth-child(2) p').textContent = text.themeDescription;
  document.querySelector('#themes-view .secret-section h3').textContent = text.secretTitle;
  document.querySelector('#themes-view .secret-section p').textContent = text.secretDescription;
  document.querySelector('#themes-view .theme-section:nth-child(2) .eyebrow').textContent = language === 'de' ? 'AOD-DATEI' : 'AOD FILE';
  document.querySelector('#themes-view .secret-section .eyebrow').textContent = 'CLASSIFIED';
  document.querySelector('#themes-view .theme-section:nth-child(4) .eyebrow').textContent = language === 'de' ? 'MEINE THEMES' : 'MY THEMES';
  document.querySelector('#language-select').value = language;
  document.querySelector('#timezone-label').textContent = language === 'de' ? 'ZEITZONE' : 'TIMEZONE';
  document.querySelector('#clock-format-label').textContent = language === 'de' ? 'ZEITFORMAT' : 'CLOCK FORMAT';
  timezoneDetected.textContent = language === 'de' ? `Systemzeitzone: ${systemTimezone}` : `System timezone: ${systemTimezone}`;
  clockFormatSelect.options[0].textContent = language === 'de' ? '24 Stunden' : '24-hour';
  clockFormatSelect.options[1].textContent = language === 'de' ? '12 Stunden' : '12-hour';
  localStorage.setItem('aod-language', language);
  updateSimpleClock();
}

function embedWebsite() {
  const url = elements.website.value.trim();
  elements.embedError.textContent = '';
  if (!/^https?:\/\//i.test(url)) {
    elements.embedError.textContent = translations[currentLanguage].invalidUrl;
    return;
  }
  const frame = document.createElement('iframe');
  frame.className = 'embedded-site';
  frame.title = 'Eingebettete Website';
  frame.src = url;
  elements.preview.replaceChildren(frame);
  elements.saved.textContent = translations[currentLanguage].websiteLoaded;
}

document.querySelector('#apply').addEventListener('click', applyDesign);
elements.simpleMode.addEventListener('click', () => setMode('simple'));
elements.advancedMode.addEventListener('click', () => setMode('advanced'));
[
  elements.clockToggle,
  elements.dateToggle,
  elements.weatherToggle,
  elements.batteryToggle
].forEach((toggle) => toggle.addEventListener('change', applyDesign));
elements.sizeSlider.addEventListener('input', updateSliders);
elements.opacitySlider.addEventListener('input', updateSliders);
document.querySelector('#embed').addEventListener('click', embedWebsite);
elements.website.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') embedWebsite();
});
 presetSelect.addEventListener('change', () => {
  const preset = presetOptions[Number(presetSelect.value)];
  if (!preset) return;
  elements.css.value = preset.css;
  applyDesign();
});
backgrounds.forEach((background, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = background.name;
  elements.backgroundSelect.appendChild(option);
});
elements.backgroundSelect.addEventListener('change', () => {
  const background = backgrounds[Number(elements.backgroundSelect.value)];
  if (!background) return;
  backgroundCss = background.css;
  applyDesign();
});
elements.videoInput.addEventListener('change', () => {
  const file = elements.videoInput.files[0];
  if (!file) return;
  if (videoUrl) URL.revokeObjectURL(videoUrl);
  videoUrl = URL.createObjectURL(file);
  const video = document.createElement('video');
  video.className = 'video-background';
  video.src = videoUrl;
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  elements.screen.prepend(video);
  elements.videoName.textContent = file.name;
  elements.saved.textContent = currentLanguage === 'de' ? 'Video geladen' : 'Video loaded';
});
document.querySelector('#clear-video').addEventListener('click', () => {
  elements.screen.querySelector('.video-background')?.remove();
  if (videoUrl) URL.revokeObjectURL(videoUrl);
  videoUrl = '';
  elements.videoInput.value = '';
  elements.videoName.textContent = translations[currentLanguage].noVideo;
});
document.querySelector('#reset').addEventListener('click', () => {
  elements.html.value = defaults.html;
  elements.css.value = defaults.css;
  elements.js.value = defaults.js;
  presetSelect.value = '';
  applyDesign();
});
function toggleAodFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else elements.screen.requestFullscreen?.();
}

document.addEventListener('fullscreenchange', () => {
  document.body.dataset.displayMode = document.fullscreenElement ? 'active' : 'inactive';
});

document.querySelector('#fullscreen').addEventListener('click', toggleAodFullscreen);
window.setInterval(updateSimpleClock, 1000);
document.addEventListener('keydown', (event) => {
  const tagName = event.target.tagName;
  if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tagName)) return;
  if (event.key.toLowerCase() === 'f' || event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    toggleAodFullscreen();
  }
});

const logoStates = ['core', 'signal', 'grid'];
let logoIndex = 0;
window.setInterval(() => {
  logoIndex = (logoIndex + 1) % logoStates.length;
  document.querySelector('#dynamic-logo').dataset.state = logoStates[logoIndex];
}, 3600);

function selectPanel(panel) {
  const themes = panel === 'themes';
  const settings = panel === 'settings';
  document.body.dataset.panel = panel;
  document.querySelector('#editor-view').hidden = themes || settings;
  document.querySelector('#themes-view').hidden = !themes;
  document.querySelector('#settings-view').hidden = !settings;
  document.querySelector('#editor-tab').classList.toggle('active', !themes && !settings);
  document.querySelector('#themes-tab').classList.toggle('active', themes);
  document.querySelector('#settings-tab').classList.toggle('active', settings);
}

function setUiTheme(theme) {
  uiTheme = theme;
  document.body.dataset.uiTheme = theme;
  document.querySelectorAll('.ui-theme-card').forEach((card) => card.classList.toggle('selected', card.dataset.uiTheme === theme));
}

function currentTheme() {
  return { format: 'zephtor.aod', version: 1, name: 'AOD Design', html: elements.html.value, css: elements.css.value, js: elements.js.value, widgets: simpleWidgets, uiTheme, timezone, clockFormat };
}

function saveCurrentTheme() {
  const theme = currentTheme();
  const history = JSON.parse(localStorage.getItem('aod-themes') || '[]');
  history.unshift({ ...theme, savedAt: new Date().toISOString() });
  localStorage.setItem('aod-themes', JSON.stringify(history.slice(0, 50)));
  localStorage.setItem('aod-last-theme', JSON.stringify(theme));
  const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/vnd.zephtor.aod+json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `aod-${Date.now()}.zephtor.aod`;
  link.click();
  URL.revokeObjectURL(link.href);
  elements.saved.textContent = currentLanguage === 'de' ? 'In Dokumente gespeichert' : 'Saved to Documents';
}

function loadTheme(theme) {
  if (!theme || theme.format !== 'zephtor.aod' || typeof theme.html !== 'string' || typeof theme.css !== 'string' || typeof theme.js !== 'string') {
    document.querySelector('#apply').addEventListener('click', () => {
      applyDesign();
      saveCurrentTheme();
    });
    elements.themeMessage.textContent = 'Ungültige AOD-Datei.';
    return;
  }
  elements.html.value = theme.html;
  elements.css.value = theme.css;
  elements.js.value = theme.js;
  if (Array.isArray(theme.widgets)) simpleWidgets = theme.widgets.filter((widget) => typeof widget === 'string');
  if (theme.uiTheme) setUiTheme(theme.uiTheme);
  if (theme.timezone && supportedTimezones.includes(theme.timezone)) { timezone = theme.timezone; timezoneSelect.value = timezone; }
  if (theme.clockFormat === '12' || theme.clockFormat === '24') { clockFormat = theme.clockFormat; clockFormatSelect.value = clockFormat; }
  setMode('simple');
  applyDesign();
  elements.themeMessage.textContent = `${theme.name || 'AOD Design'} ${translations[currentLanguage].loaded}`;
  selectPanel('editor');
}

function renderImportedThemes() {
  const target = document.querySelector('#imported-themes');
  target.innerHTML = importedThemes.length ? '' : `<p class="empty-themes">${translations[currentLanguage].emptyThemes}</p>`;
  importedThemes.forEach((theme, index) => {
    const row = document.createElement('div');
    row.className = 'imported-theme';
    const name = document.createElement('span');
    name.textContent = theme.name || `Import ${index + 1}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Laden';
    button.addEventListener('click', () => loadTheme(theme));
    row.append(name, button);
    target.appendChild(row);
  });
}

elements.themeMessage = document.querySelector('#theme-message');
document.querySelector('#editor-tab').addEventListener('click', () => selectPanel('editor'));
document.querySelector('#themes-tab').addEventListener('click', () => selectPanel('themes'));
document.querySelector('#settings-tab').addEventListener('click', () => selectPanel('settings'));
document.querySelector('#language-select').addEventListener('change', (event) => translate(event.target.value));
timezoneSelect.addEventListener('change', () => { timezone = timezoneSelect.value; localStorage.setItem('aod-timezone', timezone); updateSimpleClock(); });
document.querySelector('#auto-timezone').addEventListener('click', () => { timezone = systemTimezone; timezoneSelect.value = timezone; localStorage.setItem('aod-timezone', timezone); updateSimpleClock(); });
clockFormatSelect.addEventListener('change', () => { clockFormat = clockFormatSelect.value; localStorage.setItem('aod-clock-format', clockFormat); updateSimpleClock(); });
document.querySelectorAll('.ui-theme-card').forEach((card) => card.addEventListener('click', () => setUiTheme(card.dataset.uiTheme)));
document.querySelector('#unlock-secret').addEventListener('click', () => {
  const input = document.querySelector('#secret-code');
  const code = input.value.trim().toUpperCase();
  const theme = secretThemes[code];
  if (!theme) {
    document.querySelector('#secret-message').textContent = translations[currentLanguage].unknownCode;
    return;
  }
  if (!importedThemes.some((item) => item.name === theme.name)) importedThemes.push(theme);
  renderImportedThemes();
  const secretList = document.querySelector('#secret-themes');
  secretList.innerHTML = `<div class="imported-theme secret-theme"><span>${theme.name}</span><button type="button">Laden</button></div>`;
  secretList.querySelector('button').addEventListener('click', () => loadTheme(theme));
  document.querySelector('#secret-message').textContent = `${theme.name} ${translations[currentLanguage].unlocked}`;
  input.value = '';
});

widgetCatalog.forEach(([type, label]) => {
  const tool = document.createElement('button');
  tool.className = 'widget-tool';
  tool.type = 'button';
  tool.draggable = true;
  tool.dataset.widgetType = type;
  tool.dataset.widgetKey = label;
  tool.textContent = translations[currentLanguage][label];
  tool.addEventListener('click', () => addWidget(type));
  tool.addEventListener('dragstart', (event) => event.dataTransfer.setData('widget-type', type));
  document.querySelector('#widget-library').appendChild(tool);
});
elements.preview.addEventListener('dragstart', (event) => {
  const item = event.target.closest('.widget-item');
  if (!item) return;
  item.classList.add('dragging');
  event.dataTransfer.setData('widget-index', item.dataset.widgetIndex);
});
elements.preview.addEventListener('dragend', (event) => event.target.closest('.widget-item')?.classList.remove('dragging'));
elements.preview.addEventListener('dragover', (event) => event.preventDefault());
elements.preview.addEventListener('drop', (event) => {
  event.preventDefault();
  const type = event.dataTransfer.getData('widget-type');
  const sourceIndex = event.dataTransfer.getData('widget-index');
  const target = event.target.closest('.widget-item');
  const targetIndex = target ? Number(target.dataset.widgetIndex) : simpleWidgets.length;
  if (type) addWidget(type, targetIndex);
  else if (sourceIndex !== '') moveWidget(Number(sourceIndex), targetIndex);
});
elements.preview.addEventListener('click', (event) => {
  if (!event.target.closest('.widget-remove')) return;
  const item = event.target.closest('.widget-item');
  simpleWidgets.splice(Number(item.dataset.widgetIndex), 1);
  applyDesign();
});
document.querySelector('#remove-zone').addEventListener('dragover', (event) => {
  event.preventDefault();
  document.querySelector('.device-stage').classList.add('drag-active');
});
document.querySelector('#remove-zone').addEventListener('dragleave', () => document.querySelector('.device-stage').classList.remove('drag-active'));
document.querySelector('#remove-zone').addEventListener('drop', (event) => {
  event.preventDefault();
  const index = event.dataTransfer.getData('widget-index');
  if (index !== '') simpleWidgets.splice(Number(index), 1);
  document.querySelector('.device-stage').classList.remove('drag-active');
  applyDesign();
});
applyDesign();
setUiTheme('paper');
translate(localStorage.getItem('aod-language') || 'en');
const lastTheme = JSON.parse(localStorage.getItem('aod-last-theme') || 'null');
if (lastTheme?.format === 'zephtor.aod') loadTheme(lastTheme);