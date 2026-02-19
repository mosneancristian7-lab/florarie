// Cart state
let cart = [];

// Product images mapping
const productImages = {
    'Trandafiri Eleganți': 'images/trandafiri.png',
    'Lalele Colorate': 'images/lalele.png',
    'Orhidee': 'images/orhidee.png',
    'Bujori': 'images/bujori.png',
    'Buchet de Nuntă': 'https://images.unsplash.com/photo-1664312696723-173130983e27?w=600',
    'Hortensii': 'images/hortensii.png'
};

// Add to cart function
function addToCart(productName, price) {
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
            image: productImages[productName]
        });
    }
    
    updateCart();
    showNotification(`${productName} a fost adăugat în coș!`);
}

// Update cart display
function updateCart() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update cart count
    document.querySelector('.cart-count').textContent = cartCount;
    
    // Update cart items
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartModalFooter = document.getElementById('cartModalFooter');
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartItemsContainer.classList.remove('active');
        cartModalFooter.classList.remove('active');
    } else {
        cartEmpty.style.display = 'none';
        cartItemsContainer.classList.add('active');
        cartModalFooter.classList.add('active');
        
        // Render cart items
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} RON</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                        <button class="cart-item-remove" onclick="removeFromCart(${index})">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Update total
        document.getElementById('cartTotalPrice').textContent = `${cartTotal} RON`;
    }
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
    }
    updateCart();
}

// Remove from cart
function removeFromCart(index) {
    const productName = cart[index].name;
    cart.splice(index, 1);
    updateCart();
    showNotification(`${productName} a fost eliminat din coș.`);
}

// Open cart modal
function openCart() {
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Coșul tău este gol!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showNotification(`Mulțumim pentru comandă! Total: ${total} RON (${itemCount} ${itemCount === 1 ? 'produs' : 'produse'})`);
    
    // Clear cart
    cart = [];
    updateCart();
    closeCart();
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// Cart button click
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
}

// Cart modal close
const cartModalClose = document.getElementById('cartModalClose');
if (cartModalClose) {
    cartModalClose.addEventListener('click', closeCart);
}

// Cart modal overlay click
const cartModalOverlay = document.getElementById('cartModalOverlay');
if (cartModalOverlay) {
    cartModalOverlay.addEventListener('click', closeCart);
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Mulțumim! Mesajul tău a fost trimis cu succes. Te vom contacta în curând!');
        contactForm.reset();
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product and service cards
document.querySelectorAll('.product-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Close cart with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
    }
});

console.log('🌸 The Garden - Site-ul florăriei este gata!');
