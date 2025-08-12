document.addEventListener('DOMContentLoaded', () => {

    // 1. Criar os ícones (apenas uma vez)
    lucide.createIcons();
    
    // 2. Definir as variáveis e constantes importantes
    const phoneNumber = "5511933167736";
    let lastFocusedElement = null; 

    // 3. Declarar todas as suas funções (trapFocus, openModal, closeModal, etc.)
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
    
    // FUNÇÃO ATUALIZADA
    function updateBusinessStatus() {
        const statusIndicator = document.getElementById('hero-status-indicator');
        const statusText = document.getElementById('hero-status-text');
        if (!statusIndicator || !statusText) return;
        const now = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
        const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const hour = now.getHours();
    
        let isOpen = false;
        let statusColorClass = 'bg-red-500';
        let statusTextContent = '';
    
        if (dayOfWeek === 1) { // Segunda-feira (fechado)
            statusTextContent = "Fechado às Segundas. Abrimos Terça-feira às 08h.";
        } else if (dayOfWeek >= 2 && dayOfWeek <= 6) { // Terça a Sábado
            if (hour >= 8 && hour < 18) {
                isOpen = true;
                statusTextContent = 'Aberto agora até as 18h';
            } else {
                if (hour < 8) {
                    statusTextContent = "Fechado agora. Abrimos hoje às 08h.";
                } else { // hour >= 18
                    statusTextContent = "Fechado agora. Abrimos amanhã às 08h.";
                }
            }
        } else if (dayOfWeek === 0) { // Domingo
            if (hour >= 8 && hour < 14) {
                isOpen = true;
                statusTextContent = 'Aberto agora até as 14h';
            } else {
                statusTextContent = "Fechado agora. Abrimos novamente Terça-feira às 08h.";
            }
        }
        
        if (isOpen) {
            statusColorClass = 'bg-green-500';
        }
        statusIndicator.className = `w-3 h-3 rounded-full flex-shrink-0 ${statusColorClass}`;
        statusText.textContent = statusTextContent;
    }
    
    // 4. Rodar o código que depende dos elementos da página (event listeners, etc.)
    const serviceCards = document.querySelectorAll('.service-card');
    const detailsModal = document.getElementById('service-details-modal');
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
            lucide.createIcons(); // Recriar ícones dentro do modal
            openModal(detailsModal);
        });
    });

    closeDetailsModalBtn.addEventListener('click', () => closeModal(detailsModal));
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) closeModal(detailsModal);
    });

    const partnerCards = document.querySelectorAll('.partner-card');
    const partnerModal = document.getElementById('partner-contact-modal');
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

    const openHiringModalBtn = document.getElementById('open-hiring-modal');
    const hiringModal = document.getElementById('hiring-modal');
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
    
    // 5. Rodar a função de status e agendar sua atualização
    updateBusinessStatus();
    setInterval(updateBusinessStatus, 60000);
});