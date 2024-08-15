document.addEventListener("DOMContentLoaded", function() {
    // Carrousel Functionaliteit
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const itemCount = items.length;
    let currentIndex = 0;
    let intervalTime = 3000; // Intervaltijd voor het wisselen van afbeeldingen (3 seconden)
    let carouselInterval;

    // Functie om de carrousel te verplaatsen
    function moveCarousel() {
        currentIndex = (currentIndex + 1) % itemCount;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Start de carrousel beweging
    function startCarousel() {
        carouselInterval = setInterval(moveCarousel, intervalTime);
    }

    // Stop de carrousel beweging
    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Start de carrousel bij laden van de pagina
    startCarousel();

    // Functie om items te sorteren op prijs
    function sortItemsByPrice(order) {
        const items = document.querySelectorAll('.item');

        const sortedItems = Array.from(items).sort(function(a, b) {
            const priceA = parseFloat(a.querySelector('.price').innerText.replace('€', ''));
            const priceB = parseFloat(b.querySelector('.price').innerText.replace('€', ''));
            
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });

        const catalogContainer = document.querySelector('.catalog-container');
        catalogContainer.innerHTML = '';

        sortedItems.forEach(function(item) {
            catalogContainer.appendChild(item);
        });
    }

    // Functie om items te filteren op automerk
    function filterByCarBrand() {
        const selectedBrand = document.getElementById('carBrandFilter').value;
        const items = document.querySelectorAll('.item');

        items.forEach(function(item) {
            const itemBrand = item.getAttribute('data-brand');
            item.style.display = (selectedBrand === '' || itemBrand === selectedBrand) ? 'block' : 'none';
        });
    }

    // Voeg event listeners toe aan sorteerknoppen
    const sortAscButton = document.querySelector('button[onclick*="asc"]');
    const sortDescButton = document.querySelector('button[onclick*="desc"]');
    
    if (sortAscButton) {
        sortAscButton.addEventListener('click', function() {
            sortItemsByPrice('asc');
        });
    }

    if (sortDescButton) {
        sortDescButton.addEventListener('click', function() {
            sortItemsByPrice('desc');
        });
    }

    // Voeg event listener toe aan de dropdown filter voor automerken
    const carBrandFilter = document.getElementById('carBrandFilter');
    if (carBrandFilter) {
        carBrandFilter.addEventListener('change', function() {
            filterByCarBrand();
        });
    }
});