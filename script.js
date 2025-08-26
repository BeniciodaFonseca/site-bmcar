document.addEventListener('DOMContentLoaded', () => {

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // LÓGICA DA PÁGINA INICIAL (INDEX.HTML)
    const header = document.getElementById('header');
    if (header) {
        // Lógica do Status
        const statusIndicator = document.getElementById('status-indicator');
        if (statusIndicator) {
            const updateStatus = () => {
                const now = new Date();
                const dayOfWeek = now.getDay();
                const hour = now.getHours();
                const minutes = now.getMinutes();
                let status = 'closed', message = '', closingTime = null;
                if (dayOfWeek >= 2 && dayOfWeek <= 6) closingTime = 18;
                else if (dayOfWeek === 0) closingTime = 14;
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
                if (status === 'closed') {
                    if (dayOfWeek === 1 || (dayOfWeek === 0 && hour >= 14)) message = "Abre Terça às 08h";
                    else if (dayOfWeek === 6 && hour >= 18) message = "Abre Dom. às 08h";
                    else if (hour < 8) message = "Abre Hoje às 08h";
                    else message = "Abre Amanhã às 08h";
                }
                statusIndicator.textContent = message;
                statusIndicator.className = 'sm:block'; // Garante que a classe base seja mantida
                if (window.innerWidth < 640) { // 'sm' breakpoint de Tailwind
                    statusIndicator.classList.add('block');
                } else {
                    statusIndicator.classList.remove('block');
                }
                statusIndicator.classList.add(`status-${status}`, 'visible');
            };
            updateStatus();
            setInterval(updateStatus, 60000);
            window.addEventListener('resize', updateStatus); // Atualiza no redimensionamento
        }

        // Lógica de Navegação e Menu Mobile
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(link.getAttribute('href'));
                    if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
                    if (mobileMenu && mobileMenu.classList.contains('flex')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('flex');
                    }
                }
            });
        });
        if(mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('flex');
            });
        }
        
        // Header Inteligente
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            header.classList.toggle('bg-dark-bg/90', window.scrollY > 50);
            header.classList.toggle('header-hidden', lastScrollY < window.scrollY && window.scrollY > 150);
            lastScrollY = window.scrollY;
        });

        // Animação ao Rolar
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));

        // ===== MODAIS (SERVIÇOS E TRABALHE CONOSCO) =====
        const setupModal = (triggerButtons, overlayId, contentId, closeBtnId, dataCallback) => {
            const overlay = document.getElementById(overlayId);
            const content = document.getElementById(contentId);
            const closeBtn = document.getElementById(closeBtnId);
            if (!overlay || !content || !closeBtn || triggerButtons.length === 0) return;
            const openModal = (data) => {
                if (dataCallback) dataCallback(data);
                document.body.classList.add('modal-open');
                overlay.classList.remove('hidden', 'opacity-0');
                overlay.classList.add('flex');
                setTimeout(() => content.classList.remove('opacity-0', 'scale-95'), 10);
            };
            const closeModal = () => {
                document.body.classList.remove('modal-open');
                overlay.classList.add('opacity-0');
                content.classList.add('opacity-0', 'scale-95');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            };
            triggerButtons.forEach(button => button.addEventListener('click', () => openModal(button.dataset)));
            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
        };
        
        // Setup do Modal de Serviços
        const serviceCards = document.querySelectorAll('.service-card');
        const modalTitle = document.getElementById('service-modal-title');
        const modalPrice = document.getElementById('service-modal-price');
        const modalDetails = document.getElementById('service-modal-details');
        const modalWhatsappBtn = document.getElementById('service-modal-whatsapp-btn');
        setupModal(serviceCards, 'service-modal-overlay', 'service-modal-content', 'service-modal-close', (data) => {
            if(modalTitle) modalTitle.textContent = data.title;
            if(modalPrice) modalPrice.textContent = data.price;
            if(modalDetails) {
                modalDetails.innerHTML = '';
                JSON.parse(data.details).forEach(detail => {
                    const li = document.createElement('li');
                    li.innerHTML = detail;
                    modalDetails.appendChild(li);
                });
            }
            if(modalWhatsappBtn) {
                 const message = `Olá! Vim pelo site e gostaria de saber mais sobre o serviço de ${data.title}.`;
                 modalWhatsappBtn.href = `https://wa.me/5511933167736?text=${encodeURIComponent(message)}`;
            }
        });

        // Setup do Modal de Trabalhe Conosco
        const hiringButton = document.querySelectorAll('#open-hiring-modal');
        setupModal(hiringButton, 'hiring-modal-overlay', 'hiring-modal-content', 'hiring-modal-close');

        // Lógica dos Cards de Parceiros
        const partnerCards = document.querySelectorAll('.partner-card');
        partnerCards.forEach(card => {
            card.addEventListener('click', () => {
                const message = card.dataset.whatsappMsg;
                window.open(`https://wa.me/5511933167736?text=${encodeURIComponent(message)}`, '_blank');
            });
        });
    }

    // LÓGICA DA PÁGINA DE GALERIA (GALERIA.HTML)
    const galleryMobileButton = document.getElementById('mobile-menu-button-gallery');
    if (galleryMobileButton) {
        const mobileMenuGallery = document.getElementById('mobile-menu-gallery');
        if (mobileMenuGallery) {
            galleryMobileButton.addEventListener('click', () => {
                mobileMenuGallery.classList.toggle('hidden');
                mobileMenuGallery.classList.toggle('flex');
            });
        }
        
        const backToTopButton = document.getElementById('back-to-top-button');
        if (backToTopButton) {
            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // LÓGICA DO LIGHTBOX (FUNCIONA EM AMBAS AS PÁGINAS)
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxClose = document.getElementById('lightbox-close');
        const portfolioImages = document.querySelectorAll('.portfolio-image');
        
        const closeLightbox = () => { 
            lightbox.classList.add('hidden'); 
            lightbox.classList.remove('flex');
            document.body.classList.remove('modal-open'); 
        };

        portfolioImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
                lightboxImage.src = image.src;
                document.body.classList.add('modal-open');
            });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});