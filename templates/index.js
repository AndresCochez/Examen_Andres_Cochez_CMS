function sortItemsByPrice(order) {
    // Selecteer alle items met de klasse 'item'
    var items = document.querySelectorAll('.item');
    
    // Sorteer de items op basis van de prijs, in oplopende of aflopende volgorde
    var sortedItems = Array.from(items).sort(function(a, b) {
        // Haal de prijsinformatie op en converteer naar een getal
        var priceA = parseFloat(a.querySelector('.price').innerText.replace('€', ''));
        var priceB = parseFloat(b.querySelector('.price').innerText.replace('€', ''));
        
        // Bepaal de sorteerorde (oplopend of aflopend)
        if (order === 'asc') {
            return priceA - priceB;
        } else {
            return priceB - priceA;
        }
    });

    // Selecteer de container waarin de items worden weergegeven
    var catalogContainer = document.querySelector('.catalog-container');
    
    // Leeg de inhoud van de container
    catalogContainer.innerHTML = '';

    // Voeg de gesorteerde items toe aan de container
    sortedItems.forEach(function(item) {
        catalogContainer.appendChild(item);
    });
}