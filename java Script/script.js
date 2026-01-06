const scrollAmount = 400;

// ==================== HAMBURGER MENU FUNCTIONALITY ====================
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const columnsMenu = document.querySelector('.columns');

if (hamburgerMenu && mobileMenuOverlay && columnsMenu) {
    // Toggle menu when hamburger is clicked
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        columnsMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when overlay is clicked
    mobileMenuOverlay.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        columnsMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
    
    // Close menu when a menu link is clicked
    const menuLinks = columnsMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            columnsMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// ==================== PRODUCT SCROLLING ARROWS ====================
document.querySelectorAll('.headingNdArrow').forEach(heading => {
    const leftArrow = heading.querySelector('.leftArrow');
    const rightArrow = heading.querySelector('.rightArrow');

    // jis section me arrows hain
    const section = heading.closest('section');

    // us section ka scrollable container dhoondo
    const container =
        section.querySelector('.container') ||
        section.querySelector('.grid-top-brand');

    if (!container) return;

    rightArrow.addEventListener('click', () => {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    leftArrow.addEventListener('click', () => {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
});
/* //////////////////////////////////// */
// Country Dropdown Toggle
const authSignupCountrySelectorBtn = document.getElementById('authSignupCountrySelectorBtn');
const authSignupCountryDropdownMenu = document.getElementById('authSignupCountryDropdownMenu');
const authSignupSelectedFlagImg = document.getElementById('authSignupSelectedFlagImg');
const authSignupSelectedCountryCode = document.getElementById('authSignupSelectedCountryCode');
const authSignupPhoneInputField = document.getElementById('authSignupPhoneInputField');
const authSignupCountryOptionItems = 
document.querySelectorAll('.auth-signup-country-option-item');

// Placeholder text for each country
const authSignupPhonePlaceholders = {
    '+92': '3001234567',
    '+971': '501234567',
    '+966': '501234567'
};

// Toggle dropdown
if (authSignupCountrySelectorBtn) {
    authSignupCountrySelectorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        authSignupCountryDropdownMenu. classList.toggle('auth-signup-dropdown-is-active');
    });
}

// Select country
authSignupCountryOptionItems.forEach((option) => {
    option.addEventListener('click', () => {
        const code = option.dataset.code;
        const flag = option.dataset.flag;
        const country = option.dataset.country;
        
        // Update selected values
        authSignupSelectedCountryCode.textContent = code;
        authSignupSelectedFlagImg.src = `https://flagcdn.com/w40/${flag}.png`;
        authSignupSelectedFlagImg.alt = country;
        
        // Update placeholder based on country
        authSignupPhoneInputField.placeholder = authSignupPhonePlaceholders[code];
        authSignupPhoneInputField.value = ''; // Clear input when changing country
        
        // Update active state
        authSignupCountryOptionItems.forEach(opt => opt.classList.remove('auth-signup-country-is-active'));
        option.classList.add('auth-signup-country-is-active');
        
        // Close dropdown
        authSignupCountryDropdownMenu.classList.remove('auth-signup-dropdown-is-active');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (authSignupCountryDropdownMenu && 
        !authSignupCountrySelectorBtn. contains(e.target) && 
        !authSignupCountryDropdownMenu.contains(e. target)) {
        authSignupCountryDropdownMenu.classList. remove('auth-signup-dropdown-is-active');
    }
});

// Form submission
const authSignupMainFormElement = document.getElementById('authSignupMainFormElement');

if (authSignupMainFormElement) {
    authSignupMainFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const countryCode = authSignupSelectedCountryCode.textContent;
        const phoneNumber = authSignupPhoneInputField.value;
        
        if (!phoneNumber) {
            alert('Please enter your phone number');
            return;
        }
        
        const fullNumber = countryCode + phoneNumber;
        console.log('Phone Number:', fullNumber);
        alert(`Continue with: ${fullNumber}`);
        
        // Here you would typically send this to your backend
    });
}

// Login with Password button
const authSignupPasswordLoginBtn = document.getElementById('authSignupPasswordLoginBtn');
if (authSignupPasswordLoginBtn) {
    authSignupPasswordLoginBtn.addEventListener('click', () => {
        alert('Redirecting to password login.. .');
        // Add your password login logic here
    });
}

// Social login buttons
const authSignupFacebookLoginBtn = document.getElementById('authSignupFacebookLoginBtn');
const authSignupGoogleLoginBtn = document.getElementById('authSignupGoogleLoginBtn');

if (authSignupFacebookLoginBtn) {
    authSignupFacebookLoginBtn.addEventListener('click', () => {
        alert('Login with Facebook.. .');
        // Add Facebook OAuth logic here
    });
}

if (authSignupGoogleLoginBtn) {
    authSignupGoogleLoginBtn.addEventListener('click', () => {
        alert('Login with Google...');
        // Add Google OAuth logic here
    });
}

// Phone number validation (only numbers)
if (authSignupPhoneInputField) {
    authSignupPhoneInputField.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

// ==================== INFINITE CAROUSEL FUNCTIONALITY ====================

const authSignupCarouselSlideItems = document.querySelectorAll('.auth-signup-carousel-slide-item');
const authSignupCarouselDotIndicators = document.querySelectorAll('.auth-signup-dot-indicator');
let authSignupCurrentSlideIndex = 0;
const authSignupSlideIntervalTime = 3000; // Change slide every 3 seconds
let authSignupAutoRotateInterval;
let authSignupIsTransitioning = false;

// Function to show specific slide with smooth transition
function authSignupShowSlideByIndex(index) {
    if (authSignupIsTransitioning) return;
    
    authSignupIsTransitioning = true;
    
    // Remove active class from all slides and dots
    authSignupCarouselSlideItems.forEach(slide => {
        slide.classList.remove('auth-signup-slide-is-active');
    });
    authSignupCarouselDotIndicators.forEach(dot => {
        dot.classList.remove('auth-signup-dot-is-active');
    });
    
    // Add active class to current slide and dot
    if (authSignupCarouselSlideItems[index]) {
        authSignupCarouselSlideItems[index].classList.add('auth-signup-slide-is-active');
    }
    if (authSignupCarouselDotIndicators[index]) {
        authSignupCarouselDotIndicators[index].classList. add('auth-signup-dot-is-active');
    }
    
    // Allow next transition after animation completes
    setTimeout(() => {
        authSignupIsTransitioning = false;
    }, 500); // Match with CSS transition time
}

// Function to go to next slide (infinite loop)
function authSignupGoToNextSlide() {
    authSignupCurrentSlideIndex = (authSignupCurrentSlideIndex + 1) % authSignupCarouselSlideItems.length;
    authSignupShowSlideByIndex(authSignupCurrentSlideIndex);
}

// Start infinite auto-rotation
function authSignupStartCarousel() {
    if (authSignupCarouselSlideItems.length > 0) {
        // Clear any existing interval
        if (authSignupAutoRotateInterval) {
            clearInterval(authSignupAutoRotateInterval);
        }
        // Start infinite rotation
        authSignupAutoRotateInterval = setInterval(authSignupGoToNextSlide, authSignupSlideIntervalTime);
    }
}

// Initialize carousel on page load
if (authSignupCarouselSlideItems.length > 0) {
    // Show first slide
    authSignupShowSlideByIndex(0);
    // Start infinite rotation
    authSignupStartCarousel();
}

// Click on dots to manually change slide
authSignupCarouselDotIndicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        authSignupCurrentSlideIndex = index;
        authSignupShowSlideByIndex(authSignupCurrentSlideIndex);
        
        // Reset auto-rotate timer to continue infinite loop
        authSignupStartCarousel();
    });
});

// Pause carousel on hover
const authSignupCarouselContainerBox = document.querySelector('.auth-signup-carousel-container-box');
if (authSignupCarouselContainerBox) {
    authSignupCarouselContainerBox.addEventListener('mouseenter', () => {
        if (authSignupAutoRotateInterval) {
            clearInterval(authSignupAutoRotateInterval);
        }
    });

    authSignupCarouselContainerBox.addEventListener('mouseleave', () => {
        // Resume infinite rotation
        authSignupStartCarousel();
    });
}

// Ensure carousel continues infinitely even after visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && authSignupCarouselSlideItems.length > 0) {
        authSignupStartCarousel();
    }
});
//////////////////////
// medicine 
const medTabBar = document.getElementById('medTabBar');
const medCards = document.getElementById('medCards');
const medHeadingLetter = document.getElementById('med-heading-letter');
const medLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
let medProducts = [];

async function medLoadProducts() {
  try {
    const res = await fetch('..\\data\\products.json');
    medProducts = await res.json();
    medSetActiveLetter("A");
  } catch (err) {
    medCards.innerHTML = `<div class="med-empty">Could not load products.</div>`;
    console.error(err);
  }
}

function medRenderTabs(active = "A") {
  medTabBar.innerHTML = "";
  medLetters.forEach(letter => {
    const div = document.createElement("div");
    div.className = "med-tab" + (letter === active ? " med-active" : "");
    div.textContent = letter;
    div.addEventListener("click", () => medSetActiveLetter(letter));
    medTabBar.appendChild(div);
  });
}

function medSetActiveLetter(letter) {
  medHeadingLetter.textContent = letter;
  medRenderTabs(letter);
  medRenderCards(letter);
}

function medRenderCards(letter) {
  medCards.innerHTML = "";
  const filtered = medProducts.filter(p => p.letter?.toUpperCase() === letter);
  if (!filtered.length) {
    medCards.innerHTML = `<div class="med-empty">No medicines starting with "${letter}".</div>`;
    return;
  }
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "med-card";
    card.innerHTML = `
      <div class="med-badge">${p.off || ""}</div>
      <div class="med-img-box"><img src="${p.img}" alt="${p.name}"></div>
      <div class="med-title">${p.name}</div>
      <div class="med-subtitle">${p.brand}</div>
      <div class="med-subtitle">${p.pack}</div>
      <div class="med-price">Rs ${p.price} <span class="med-old">Rs ${p.oldPrice}</span></div>
      <button class="med-btn">Add to Cart</button>
    `;
    medCards.appendChild(card);
  });
}

// Init
medLoadProducts();