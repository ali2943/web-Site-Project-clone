const chipRow = document.getElementById('med2ChipRow');
const cardGrid = document.getElementById('med2Cards');

async function med2LoadChips() {
  try {
    const res = await fetch('../data/chips.json'); // adjust path if needed
    const chips = await res.json();
    med2RenderChips(chips);
  } catch (err) {
    chipRow.innerHTML = '<div class="med2-sub">Could not load chips.</div>';
    console.error(err);
  }
}

async function med2LoadProducts() {
  try {
    const res = await fetch('../data/chips.json'); // adjust path if needed
    const products = await res.json();
    med2RenderCards(products);
  } catch (err) {
    cardGrid.innerHTML = '<div class="med2-empty">Could not load products.</div>';
    console.error(err);
  }
}

function med2RenderChips(chips) {
  chipRow.innerHTML = "";
  chips.forEach(text => {
    const chip = document.createElement('button');
    chip.className = 'med2-chip';
    chip.textContent = text;
    chipRow.appendChild(chip);
  });
}

function med2RenderCards(products) {
  cardGrid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'med2-card';
    card.innerHTML = `
      <div class="med2-badge">${p.off || ""}</div>
      <div class="med2-img-box"><img src="${p.img}" alt="${p.name}"></div>
      <div class="med2-title">${p.name}</div>
      <div class="med2-sub">${p.brand}</div>
      <div class="med2-sub">${p.pack}</div>
      <div class="med2-price">Rs ${p.price}<span class="med2-old">Rs ${p.oldPrice}</span></div>
    `;
    cardGrid.appendChild(card);
  });
}

med2LoadChips();
med2LoadProducts();
///////////////////well being products
const med3Grid = document.getElementById('med3Grid');
const med3Search = document.getElementById('med3Search');
const med3Sort = document.getElementById('med3Sort');

let med3Products = [];
let med3OriginalOrder = [];

// Load products from JSON
async function med3LoadProducts() {
  try {
    const res = await fetch('../data/wellbeing-products.json'); // adjust path if needed
    med3Products = await res.json();
    med3OriginalOrder = [...med3Products];
    med3RenderCards(med3Products);
  } catch (err) {
    med3Grid.innerHTML = '<div class="med3-empty">Could not load products.</div>';
    console.error(err);
  }
}

// Render cards
function med3RenderCards(list) {
  med3Grid.innerHTML = '';
  if (!list.length) {
    med3Grid.innerHTML = '<div class="med3-empty">No products found.</div>';
    return;
  }
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'med3-card';
    const disabled = p.available === false;
    card.innerHTML = `
      <div class="med3-badge">${p.off || ''}</div>
      <div class="med3-img-box"><img src="${p.img}" alt="${p.name}"></div>
      <div class="med3-title-sm">${p.name}</div>
      <div class="med3-sub">${p.brand || ''}</div>
      <div class="med3-sub">${p.pack || ''}</div>
      <div class="med3-price">Rs. ${p.price}<span class="med3-old">${p.oldPrice ? 'Rs. ' + p.oldPrice : ''}</span></div>
      <button class="med3-btn ${disabled ? 'med3-disabled' : ''}" ${disabled ? 'disabled' : ''}>
        ${disabled ? 'Sold Out' : 'Add to cart'}
      </button>
    `;
    med3Grid.appendChild(card);
  });
}

// Filter + sort pipeline
function med3ApplyFilters() {
  const term = med3Search.value.trim().toLowerCase();
  let list = med3OriginalOrder.filter(p =>
    [p.name, p.brand, p.pack].some(v => (v || '').toLowerCase().includes(term))
  );

  const sortVal = med3Sort.value;
  if (sortVal === 'priceAsc') list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
  else if (sortVal === 'priceDesc') list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
  else if (sortVal === 'nameAsc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  // default keeps original order

  med3RenderCards(list);
}

// Events
med3Search.addEventListener('input', med3ApplyFilters);
med3Sort.addEventListener('change', med3ApplyFilters);

// Init
med3LoadProducts();
////////////////////////men products
const med4Grid = document.getElementById('med4Grid');
const med4Search = document.getElementById('med4Search');
const med4Clear = document.getElementById('med4Clear');
const med4Sort = document.getElementById('med4Sort');

let med4Products = [];
let med4OriginalOrder = [];

// Load products
async function med4LoadProducts() {
  try {
    const res = await fetch('../data/men-products.json'); // adjust path if needed
    med4Products = await res.json();
    med4OriginalOrder = [...med4Products];
    med4RenderCards(med4Products);
  } catch (err) {
    med4Grid.innerHTML = '<div class="med4-empty">Could not load products.</div>';
    console.error(err);
  }
}

function med4RenderCards(list) {
  med4Grid.innerHTML = '';
  if (!list.length) {
    med4Grid.innerHTML = '<div class="med4-empty">No products found.</div>';
    return;
  }
  list.forEach(p => {
    const card = document.createElement('div');
    const disabled = p.available === false;
    card.className = 'med4-card';
    card.innerHTML = `
      <div class="med4-badge">${p.off || ''}</div>
      <div class="med4-img-box"><img src="${p.img}" alt="${p.name}"></div>
      <div class="med4-title-sm">${p.name}</div>
      <div class="med4-sub">${p.brand || ''}</div>
      <div class="med4-sub">${p.pack || ''}</div>
      <div class="med4-price">Rs. ${p.price}<span class="med4-old">${p.oldPrice ? 'Rs. ' + p.oldPrice : ''}</span></div>
      <button class="med4-btn ${disabled ? 'med4-disabled' : ''}" ${disabled ? 'disabled' : ''}>
        ${disabled ? 'Sold Out' : 'Add to cart'}
      </button>
    `;
    med4Grid.appendChild(card);
  });
}

// Filter + sort
function med4ApplyFilters() {
  const term = med4Search.value.trim().toLowerCase();
  let list = med4OriginalOrder.filter(p =>
    [p.name, p.brand, p.pack].some(v => (v || '').toLowerCase().includes(term))
  );

  const sortVal = med4Sort.value;
  if (sortVal === 'priceAsc') list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
  else if (sortVal === 'priceDesc') list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
  else if (sortVal === 'nameAsc') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  // default: original order

  med4RenderCards(list);
}

// Events
med4Search.addEventListener('input', med4ApplyFilters);
med4Sort.addEventListener('change', med4ApplyFilters);
med4Clear.addEventListener('click', () => {
  med4Search.value = '';
  med4Sort.value = 'default';
  med4ApplyFilters();
});

// Init
med4LoadProducts();
