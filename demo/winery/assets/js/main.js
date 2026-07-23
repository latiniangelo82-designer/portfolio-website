document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.main-sidebar');
    const collapseElements = document.querySelectorAll('.collapse');

    const updateCollapseStyle = (collapseEl) => {
        const isSmall = sidebar.offsetWidth <= 76;
        const isBigger = sidebar.offsetWidth > 76;

        if (isSmall) {
            // --- MODALITÀ SIDEBAR PICCOLA ---
            if (collapseEl.classList.contains('show')) {
                collapseEl.style.setProperty('transition', 'none', 'important');
                collapseEl.style.setProperty('position', 'fixed', 'important');
                collapseEl.style.setProperty('left', '76px', 'important');
                collapseEl.style.setProperty('width', 'auto', 'important');
                collapseEl.style.setProperty('height', 'auto', 'important');
                collapseEl.style.setProperty('z-index', '9999', 'important');
                collapseEl.style.setProperty('display', 'block', 'important');

                const parentLink = collapseEl.parentElement.querySelector('.nav-link');
                if (parentLink) {
                    const rect = parentLink.getBoundingClientRect();
                    collapseEl.style.setProperty('top', `${rect.top}px`, 'important');
                }
            } else if (isBigger) {
                // Pulizia quando si chiude in modalità piccola
                collapseEl.style.removeProperty('position');
                collapseEl.style.removeProperty('left');
                collapseEl.style.removeProperty('top');
                collapseEl.style.removeProperty('width');
                collapseEl.style.removeProperty('height');
                collapseEl.style.removeProperty('z-index');
                collapseEl.style.removeProperty('display');
                collapseEl.style.removeProperty('transition');
            }
        } else {
            // --- MODALITÀ SIDEBAR LARGA ---
            // Rimuoviamo gli stili "fixed" solo se esistono (residui del passaggio small -> large)
            // NON tocchiamo la height qui, così Bootstrap può animarla liberamente
            if (collapseEl.style.position === 'fixed') {
                collapseEl.style.removeProperty('position');
                collapseEl.style.removeProperty('left');
                collapseEl.style.removeProperty('top');
                collapseEl.style.removeProperty('width');
                collapseEl.style.removeProperty('z-index');
                collapseEl.style.removeProperty('display');
                collapseEl.style.removeProperty('transition');
                // Resettiamo l'altezza solo una volta per permettere a BS di riprendere il controllo
                collapseEl.style.removeProperty('height');
            }
        }
    };

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateCollapseStyle(mutation.target);
            }
        });
    });

    collapseElements.forEach(el => {
        observer.observe(el, { attributes: true });
    });

    window.addEventListener('resize', () => {
        collapseElements.forEach(el => updateCollapseStyle(el));
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement; // Seleziona il tag <html>

    const updateSidebarAttribute = () => {
        const width = window.innerWidth;

        if (width >= 1200) {
            // Desktop: Sidebar Large
            htmlElement.setAttribute('data-sidebar', 'large');
            htmlElement.setAttribute('data-content-width', 'fluid');
        } else if (width >= 768) {
            // Tablet: Sidebar Small
            htmlElement.setAttribute('data-sidebar', 'small');
        } else {
            // Mobile: Possiamo decidere se lasciarlo small o mettere hidden
            // Per ora seguiamo la tua indicazione: sotto i 768 lo gestiamo dopo
            htmlElement.setAttribute('data-sidebar', 'hidden'); 
        }
    };

    // Esegui al caricamento della pagina
    updateSidebarAttribute();

    // Aggiorna al ridimensionamento della finestra
    window.addEventListener('resize', updateSidebarAttribute);
});