document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const getCart = () => {
        const storedCart = localStorage.getItem('anteocionCart');
        return storedCart ? JSON.parse(storedCart) : [];
    };

    let cart = getCart();

    // Guardar en localStorage
    const saveCart = () => {
        localStorage.setItem('anteocionCart', JSON.stringify(cart));
    };

    const addProductButtons = document.querySelectorAll('.product-card .btn-secondary');

    // Guardado de productos en el carrito
    addProductButtons.forEach(button => {
        button.addEventListener('click', (e) => {

            // Guardar datos del producto
            const card = e.target.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            const imageSrc = card.querySelector('.product-img').src;

            const priceText = card.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('$', '').replace(' USD', ''));

            const existingItem = cart.find(item => item.name === name);

            // Si existe sumar cantidad
            if (existingItem) {
                existingItem.quantity += 1;
            } else { // Agregar producto
                cart.push({ name, price, quantity: 1, imageSrc });
            }
            saveCart();
        
            alert(`"${name}" agregado al carrito. ¡Revisa tu carrito!`);
        });
    });

    // Funcionalidad de Preguntas Frecuentes (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Cierra todos los demás ítems
            faqItems.forEach(i => {
                if (i !== item && i.classList.contains('active')) {
                    i.classList.remove('active');
                }
            });
            // Alterna el ítem clicado
            item.classList.toggle('active');
        });
    });

    // Widget Emergente de Patrocinadores
    const sponsorWidget = document.getElementById('sponsor-widget');
    const closeWidgetBtn = document.getElementById('close-widget');

    // Mostrar el widget después de un breve retraso
    setTimeout(() => {
        sponsorWidget.classList.add('active');
    }, 2000); // Aparecer después de 2 segundos

    closeWidgetBtn.addEventListener('click', () => {
        sponsorWidget.classList.remove('active');
    });

    // Formulario
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado exitosamente. ¡Gracias por contactar con Anteocion!');
            contactForm.reset();
        });
    }
});