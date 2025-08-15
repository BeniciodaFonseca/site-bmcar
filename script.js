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
    
    // Listeners dos Modais
    const serviceCards = document.querySelectorAll('.service-card');
    const detailsModal = document.getElementById('service-details-modal');
    // ... (o seu código completo para os listeners dos modais deve estar aqui)

    updateBusinessStatus();
    setInterval(updateBusinessStatus, 60000);

    // Lógica para o Menu Mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOpenIcon = document.getElementById('menu-open-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        });

        mobileMenuLinks.forEach(link => {
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
});