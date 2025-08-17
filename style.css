/* Animação de fade-in para seções ao rolar */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ===== ANIMAÇÕES DE LUXO NA HOME ===== */
.animate-fadeInUp {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 1s ease-out forwards;
}
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.hero-h1 { animation-delay: 0.2s; }
.hero-p { animation-delay: 0.4s; }
.hero-buttons { animation-delay: 0.6s; }

/* ===== ANIMAÇÕES DOS BOTÕES ===== */
.btn {
    transition: all 0.3s ease-in-out;
}
.btn-yellow:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 215, 0, 0.2);
}
.btn-white:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
}

/* ===== ESTILOS PARA O STATUS ===== */
#status-indicator {
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.5s ease-out;
}
#status-indicator.visible {
    opacity: 1;
    transform: translateY(0);
}
.status-open { background-color: #10B981; } /* Verde */
.status-closing-soon { background-color: #F59E0B; } /* Amarelo */
.status-closed { background-color: #EF4444; } /* Vermelho */

/* ===== ANIMAÇÃO DE TRANSIÇÃO DE PÁGINA ===== */
#page-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #101010;
    opacity: 0;
    z-index: 9999;
    pointer-events: none;
    transition: opacity 0.4s ease-in-out;
}
#page-transition-overlay.active {
    opacity: 1;
    pointer-events: all;
}

/* ===== SETA DE SCROLL ANIMADA ===== */
#scroll-down-arrow {
    transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    animation: bounce 2.5s infinite;
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) translateX(-50%);
    }
    40% {
        transform: translateY(-20px) translateX(-50%);
    }
    60% {
        transform: translateY(-10px) translateX(-50%);
    }
}

/* ===== MODAIS ===== */
.modal-overlay {
    transition: opacity 0.3s ease-in-out;
}
.modal-content {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
body.modal-open {
    overflow: hidden;
}

/* ===== HEADER INTELIGENTE ===== */
#header.header-hidden {
    transform: translateY(-100%);
}
