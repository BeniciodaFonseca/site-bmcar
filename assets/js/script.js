document.addEventListener('DOMContentLoaded', () => {

    // Ativa os ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ===== Lógica do Status de Aberto/Fechado =====
    const updateStatus = () => {
        const statusElement = document.getElementById('status-indicator');
        if (!statusElement) return;

        const now = new Date();
        const dayOfWeek = now.getDay(); // 0=Dom, 1=Seg, ..., 6=Sáb
        const hour = now.getHours();
        const minutes = now.getMinutes();

        let status = 'closed'; // Padrão é fechado
        let message = '';
        let closingTime = null;

        // Define o horário de fechamento do dia
        if (dayOfWeek >= 2 && dayOfWeek <= 6) closingTime = 18; // Ter-Sáb
        else if (dayOfWeek === 0) closingTime = 14; // Dom

        // Verifica o status
        if (closingTime !== null) {
            if (hour >= 8 && hour < closingTime - 1) {
                status = 'open';
                message = `Aberto até as ${closingTime}h`;
            } else if (hour === closingTime - 1) {
                status = 'closing-soon';
                const minutesLeft = 60 - minutes;
                message = `Fecha em ${minutesLeft} min`;
            }
        }

        // Se não estiver aberto ou fechando em breve, está fechado. Define a msg de próxima abertura.
        if (status === 'closed') {
            if (dayOfWeek === 1 || (dayOfWeek === 0 && hour >= 14)) {
                message = "Abre Terça às 08h";
            } else if (dayOfWeek === 6 && hour >= 18) {
                message = "Abre Dom. às 08h";
            } else if (hour < 8) {
                message = "Abre Hoje às 08h";
            } else {
                message = "Abre Amanhã às 08h";
            }
        }

        // Aplica as classes e o texto
        statusElement.textContent = message;
        statusElement.classList.remove('status-open', 'status-closing-soon', 'status-closed', 'hidden');
        if (status === 'open') statusElement.classList.add('status-open');
        else if (status === 'closing-soon') statusElement.classList.add('status-closing-soon');
        else statusElement.classList.add('status-closed');
        
        statusElement.classList.add('visible');
    };

    // Roda a função e depois a cada minuto
    updateStatus();
    setInterval(updateStatus, 60000);

    // ===== Lógica da Transição de Página (suave) =====
    const navLinks = document.querySelectorAll('.nav-link');
    const overlay = document.getElementById('page-transition-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Ignora links externos e âncoras na mesma página
            if (href.startsWith('#') || href.startsWith('http') || link.getAttribute('target') === '_blank') {
                return;
            }
            
            e.preventDefault();
            if (overlay) {
                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            } else {
                window.location.href = href;
            }
        });
    });

    // ===== Lógica do Menu de Celular =====
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    };
    if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleMenu);
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // ===== Lógica do Header Inteligente =====
    const header = document.getElementById('header');
    if(header) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('bg-dark-bg/90', 'backdrop-blur-sm', 'shadow-lg');
            } else {
                header.classList.remove('bg-dark-bg/90', 'backdrop-blur-sm', 'shadow-lg');
            }
            if (lastScrollY < window.scrollY && window.scrollY > 150) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollY = window.scrollY;
        });
    }

    // ===== Lógica da Animação ao Rolar a Página =====
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));
    }
    
    // ===== LÓGICA DOS MODAIS (GENÉRICA) =====
    const setupModal = (triggerBtnId, overlayId, contentId, closeBtnId) => {
        const triggerBtn = document.getElementById(triggerBtnId);
        const overlay = document.getElementById(overlayId);
        const content = document.getElementById(contentId);
        const closeBtn = document.getElementById(closeBtnId);

        if (!triggerBtn || !overlay || !content || !closeBtn) return;

        const open = () => {
            document.body.classList.add('modal-open');
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            setTimeout(() => {
                overlay.classList.remove('opacity-0');
                content.classList.remove('opacity-0', 'scale-95');
            }, 10);
        };

        const close = () => {
            document.body.classList.remove('modal-open');
            overlay.classList.add('opacity-0');
            content.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
            }, 300);
        };

        triggerBtn.addEventListener('click', open);
        closeBtn.addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
    };
    
    // Setup do Modal de Trabalhe Conosco
    setupModal('open-hiring-modal', 'hiring-modal-overlay', 'hiring-modal-content', 'hiring-modal-close');

    // Setup do Modal de Serviços
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModalOverlay = document.getElementById('service-modal-overlay');
    const serviceModalContent = document.getElementById('service-modal-content');
    const serviceModalCloseBtn = document.getElementById('service-modal-close');
    const modalTitle = document.getElementById('service-modal-title');
    const modalPrice = document.getElementById('service-modal-price');
    const modalDetails = document.getElementById('service-modal-details');
    const modalWhatsappBtn = document.getElementById('service-modal-whatsapp-btn');

    if (serviceCards.length > 0) {
        const openServiceModal = (title, price, details) => {
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalDetails.innerHTML = '';
            const detailsArray = JSON.parse(details);
            detailsArray.forEach(detail => {
                const li = document.createElement('li');
                li.innerHTML = detail; // Use innerHTML para renderizar tags como <strong>
                modalDetails.appendChild(li);
            });

            const message = `Olá! Vim pelo site e gostaria de saber mais sobre o serviço de ${title}.`;
            const encodedMessage = encodeURIComponent(message);
            modalWhatsappBtn.href = `https://wa.me/5511933167736?text=${encodedMessage}`;
            
            document.body.classList.add('modal-open');
            serviceModalOverlay.classList.remove('hidden');
            serviceModalOverlay.classList.add('flex');
            setTimeout(() => {
                serviceModalOverlay.classList.remove('opacity-0');
                serviceModalContent.classList.remove('opacity-0', 'scale-95');
            }, 10);
        };

        const closeServiceModal = () => {
            document.body.classList.remove('modal-open');
            serviceModalOverlay.classList.add('opacity-0');
            serviceModalContent.classList.add('opacity-0', 'scale-95');
            setTimeout(() => {
                serviceModalOverlay.classList.add('hidden');
                serviceModalOverlay.classList.remove('flex');
            }, 300);
        };

        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                openServiceModal(card.dataset.title, card.dataset.price, card.dataset.details);
            });
        });

        if(serviceModalCloseBtn) serviceModalCloseBtn.addEventListener('click', closeServiceModal);
        if(serviceModalOverlay) serviceModalOverlay.addEventListener('click', (e) => {
            if (e.target === serviceModalOverlay) closeServiceModal();
        });
    }

    // ===== LÓGICA DOS PARCEIROS =====
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach(card => {
        card.addEventListener('click', () => {
            const message = card.dataset.whatsappMsg;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/5511933167736?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});
// ===== LÓGICA DA GALERIA (LIGHTBOX) =====
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'flex'; // Mostra o lightbox
                lightboxImage.src = item.src; // Define a imagem clicada
                document.body.style.overflow = 'hidden'; // Impede o scroll da página
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none'; // Esconde o lightbox
            document.body.style.overflow = 'auto'; // Restaura o scroll
        };

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Fecha se clicar fora da imagem
                closeLightbox();
            }
        });
    }
});