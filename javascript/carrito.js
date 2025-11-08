document.addEventListener('DOMContentLoaded', () => {
    // Cargar Feather Icons
    feather.replace();

    // Menu hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- SISTEMA DEL CARRITO ---
    const CART_STORAGE_KEY = 'anteocionCart';
    
    // Elementos del DOM para el carrito y checkout
    const cartSummary = document.getElementById('cart-summary');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartContent = document.getElementById('cart-content');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutForm = document.getElementById('checkout-form');
    const finalTotalSpan = document.getElementById('final-total');
    
    let cart = [];

    const getCart = () => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const saveCart = () => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    };

    const updateCartView = () => {
        cart = getCart();
        cartList.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartSummary.innerHTML = '<p class="tagline">Tu carrito está vacío. ¡Empieza a explorar nuestros modelos!</p>';
            cartSummary.classList.remove('hidden');
            return;
        }

        cartSummary.classList.remove('hidden');
        cartContent.classList.remove('hidden');
        checkoutFormContainer.classList.add('hidden');

        // Después (Modificación en javascript/carrito.js)
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('cart-item-detail');
            li.innerHTML = `
                <div class="cart-item-container">
                    <img src="${item.imageSrc}" alt="${item.name}" class="cart-product-img">
                    <div class="item-text-container">
                        <span class="item-name">${item.name}</span>
                        <span class="neon-glow"> (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} USD</span>
                    </div>
                </div>
                <button class="remove-item-btn" data-index="${index}"><i data-feather="x"></i></button>
            `;
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toFixed(2)} USD`;
        feather.replace();
        
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                removeItemFromCart(index);
            });
        });
    };

    const removeItemFromCart = (index) => {
        cart.splice(index, 1);
        saveCart();
        updateCartView();
    };

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('El carrito está vacío. No puedes finalizar la compra.');
                return;
            }

            cartContent.classList.add('hidden');
            checkoutFormContainer.classList.remove('hidden');
            
            finalTotalSpan.textContent = cartTotal.textContent;
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const total = finalTotalSpan.textContent;
            alert(`¡Compra exitosa! Se ha procesado tu pedido por ${total}. Gracias por confiar en Anteocion.`);
            
            // Restablecer la aplicación
            cart.length = 0;
            saveCart(); // Reestablecer carrito
            checkoutForm.reset();
            
            updateCartView();
            cartContent.classList.remove('hidden');
            checkoutFormContainer.classList.add('hidden');
        });
    }
    
    updateCartView();
});