/**
 * NOVEO - Global Interaction Management
 *
 * Manages:
 * 1. Full-screen Overlays (Search & Mobile Menu)
 * 2. Sticky Header functionality for .header-default on scroll
 * 3. Opening/Closing of Sub-Menus in the Mobile Menu
 * 4. Counter Animation on scroll (Intersection Observer)
 * 5. Isotope Filtering for Portfolio
 * 6. Working Process Interactive Steps Handler (Vertical Progress)
 *
 * Requires jQuery, Animate.css, and Isotope.js.
 */

$(document).ready(function() {

    // ===================================================================
    // DOM REFERENCES AND CLASSES
    // ===================================================================

    

    // --- Language Switch Selectors ---
    const $langMenuContainer = $('.lang-menu');
    const $currentLangDisplay = $('.lang-menu-item > .lang-selected');
    const $dropdownLinks = $('.lang-menu-dropdown .lang-menu-link');

  

    // ===================================================================
    // LANGUAGE SELECTOR LOGIC (CLICK + OUTSIDE CLOSE)
    // ===================================================================

    if ($langMenuContainer.length) {

        // Apre e chiude il dropdown al click sulla lingua corrente
        $currentLangDisplay.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $langMenuContainer.toggleClass('lang-open');
        });

        // NOTA: Rimosso e.preventDefault() dal click sui link delle lingue
        // per permettere il regolare reindirizzamento alle rispettive pagine PHP.
        $langMenuContainer.on('click', '.lang-menu-link', function (e) {
            e.stopPropagation(); // Ferma la propagazione, ma lascia che l'href funzioni
            $langMenuContainer.removeClass('lang-open');
        });

        // Chiude il menu se si clicca ovunque fuori nel documento
        $(document).on('click', function () {
            $langMenuContainer.removeClass('lang-open');
        });
    }



});

