document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();
    
    const phoneNumber = "5511933167736";
    let lastFocusedElement = null; 

    // Funções dos Modais
    function trapFocus(modalElement) {
        const focusableElements = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length === 0) return;
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];
        modalElement.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) { 
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else { 
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            } else if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.fixed.inset-0:not(.hidden)');
                if (modals.length > 0) {
                    modals[modals.length - 1].querySelector('button[aria-label^="Fechar"]').click();
                }
            }
        });
        firstFocusableElement.focus();
    }
    
    function openModal(modal) {
        lastFocusedElement = document.activeElement;
        modal.classList.remove('hidden');
        trapFocus(modal);
    }
    
    function closeModal(modal) {
        modal.classList.add('hidden');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }
    
    // Função do Status de Aberto/Fechado
    function updateBusinessStatus() {
        const statusInfo = document.getElementById('hero-status-info');
        const statusIndicator = document.getElementById('hero-status-indicator');
        const statusText = document.getElementById('hero-status-text');
        if (!statusInfo || !statusIndicator || !statusText) return;

        statusInfo.classList.remove('text-green-400', 'text-red-400', 'animate-pulse');
        statusIndicator.className = 'w-3 h-3 rounded-full flex-shrink-0';

        const now = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
        const dayOfWeek = now.getDay();
        const hour = now.getHours();
    
        let isOpen = false;
        let statusTextContent = '';
        const isMobile = window.innerWidth <= 640;
    
        if (dayOfWeek === 1) {
            statusTextContent = isMobile ? "Fechado. Abrimos Terça às 08h." : "Fechado às Segundas. Abrimos Terça-feira às 08h.";
        } else if (dayOfWeek >= 2 && dayOfWeek <= 6) {
            if (hour >= 8 && hour < 18) {
                isOpen = true;
                statusTextContent = 'Aberto agora até as 18h';
            } else {
                statusTextContent = (hour < 8) ? "Fechado. Abrimos hoje às 08h." : "Fechado. Abrimos amanhã às 08h.";
            }
        } else if (dayOfWeek === 0) {
            if (hour >= 8 && hour < 14) {
                isOpen = true;
                statusTextContent = 'Aberto agora até as 14h';
            } else {
                statusTextContent = isMobile ? "Fechado. Abrimos Terça às 08h." : "Fechado agora. Abrimos novamente Terça-feira às 08h.";
            }
        }
        
        statusText.textContent = statusTextContent;

        if (isOpen) {
            statusInfo.classList.add('text-green-400', 'animate-pulse');
            statusIndicator.classList.add('bg-green-500');
        } else {
            statusInfo.classList.add('text-red-400');
            statusIndicator.classList.add('bg-red-500');
        }
    }
    
    updateBusinessStatus();
    setInterval(updateBusinessStatus, 60000);

    // Lógica para os Modais
    const serviceCards = document.querySelectorAll('.service-card');
    const detailsModal = document.getElementById('service-details-modal');
    if(detailsModal) {
        const closeDetailsModalBtn = document.getElementById('close-details-modal-btn');
        const modalTitle = document.getElementById('details-modal-title');
        const modalPrice = document.getElementById('details-modal-price');
        const modalList = document.getElementById('details-modal-list');
        const serviceWhatsappLink = document.getElementById('service-whatsapp-link');
        const servicePhoneLink = document.getElementById('service-phone-link');

        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.dataset.title;
                const price = card.dataset.price;
                const details = JSON.parse(card.dataset.details);
                modalTitle.textContent = title;
                if (price.toLowerCase().includes("consulte")) {
                    modalPrice.innerHTML = `<span class="text-lg font-bold text-gray-700">${price}</span>`;
                } else {
                    const numericPart = price.replace(/a partir de/i, '').trim();
                    modalPrice.innerHTML = `<span class="text-sm font-medium text-gray-500">a partir de</span> <span class="text-lg font-bold text-gray-700">${numericPart}</span>`;
                }
                modalList.innerHTML = ''; 
                details.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'flex items-center gap-2';
                    li.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-green-500" aria-hidden="true"></i><span>${item}</span>`;
                    modalList.appendChild(li);
                });
                const whatsappMsg = `Olá! Gostaria de saber mais sobre o serviço de *${title}*.`;
                serviceWhatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`;
                servicePhoneLink.href = `tel:${phoneNumber}`;
                lucide.createIcons();
                openModal(detailsModal);
            });
        });

        closeDetailsModalBtn.addEventListener('click', () => closeModal(detailsModal));
        detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) closeModal(detailsModal);
        });
    }

    const partnerCards = document.querySelectorAll('.partner-card');
    const partnerModal = document.getElementById('partner-contact-modal');
    if(partnerModal) {
        const closePartnerModalBtn = document.getElementById('close-partner-modal-btn');
        const partnerWhatsappLink = document.getElementById('partner-whatsapp-link');
        const partnerPhoneLink = document.getElementById('partner-phone-link');
        partnerCards.forEach(card => {
            card.addEventListener('click', () => {
                const whatsappMsg = card.dataset.whatsappMsg;
                partnerWhatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`;
                partnerPhoneLink.href = `tel:${phoneNumber}`;
                openModal(partnerModal);
            });
        });
        closePartnerModalBtn.addEventListener('click', () => closeModal(partnerModal));
        partnerModal.addEventListener('click', (e) => {
            if (e.target === partnerModal) closeModal(partnerModal);
        });
    }

    const openHiringModalBtn = document.getElementById('open-hiring-modal');
    const hiringModal = document.getElementById('hiring-modal');
    if(hiringModal) {
        const closeHiringModalBtn = document.getElementById('close-hiring-modal-btn');
        const hiringWhatsappLink = document.getElementById('hiring-whatsapp-link');
        const hiringPhoneLink = document.getElementById('hiring-phone-link');
        openHiringModalBtn.addEventListener('click', () => {
            const whatsappMsg = "Olá! Tenho interesse na vaga de emprego e gostaria de saber mais.";
            hiringWhatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`;
            hiringPhoneLink.href = `tel:${phoneNumber}`;
            openModal(hiringModal);
        });
        closeHiringModalBtn.addEventListener('click', () => closeModal(hiringModal));
        hiringModal.addEventListener('click', (e) => {
            if (e.target === hiringModal) closeModal(hiringModal);
        });
    }

    // Lógica para o Menu Mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');

    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        });

        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuOpenIcon.classList.remove('hidden');
                menuCloseIcon.classList.add('hidden');
            });
        });
    }

    // Lógica para o scroll do Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('bg-opacity-80', 'shadow-lg');
            } else {
                header.classList.remove('bg-opacity-80', 'shadow-lg');
            }
        }
    });

    // Lógica definitiva para rolagem suave
    document.querySelectorAll('a.anchor-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});