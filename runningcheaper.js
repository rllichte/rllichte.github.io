// Your provided JSON data
const shoeData = {
  "shoes": [
    {
      "model": "Air Max 1 '87",
      "gender": "men",
      "colorways": [
        {
          "color": "Red/White",
          "image": "https://via.placeholder.com/150/FF0000/FFFFFF?text=Red/White", // Placeholder Image
          "links": [
            {
              "website": "Nike",
              "url": "#", // Replace with actual URL
              "sizes": {
                "8": { "price": 150.00, "currency": "USD" },
                "9": { "price": 155.00, "currency": "USD" },
                "10": { "price": 160.00, "currency": "USD" }
              }
            },
            {
              "website": "Foot Locker",
              "url": "#", // Replace with actual URL
              "sizes": {
                "8": { "price": 155.00, "currency": "USD" },
                "9": { "price": 160.00, "currency": "USD" },
                "10": { "price": 165.00, "currency": "USD" }
              }
            }
          ]
        },
        {
          "color": "Blue/Grey",
          "image": "https://via.placeholder.com/150/007bff/CCCCCC?text=Blue/Grey", // Placeholder Image
          "links": [
            {
              "website": "Nike",
              "url": "#", // Replace with actual URL
              "sizes": {
                "8.5": { "price": 150.00, "currency": "USD" },
                "9.5": { "price": 160.00, "currency": "USD" },
                "10": { "price": 160.00, "currency": "USD" }
              }
            },
             {
              "website": "StockX",
              "url": "#", // Replace with actual URL
              "sizes": {
                "8": { "price": 175.00, "currency": "USD" },
                "9": { "price": 180.00, "currency": "USD" },
                "10": { "price": 185.00, "currency": "USD" }
              }
            }
          ]
        }
      ],
      "description": "The classic Air Max 1 with retro styling."
    },
    {
      "model": "Ultraboost DNA",
      "gender": "women",
      "colorways": [
        {
          "color": "Black/White",
          "image": "https://via.placeholder.com/150/000000/FFFFFF?text=Black/White", // Placeholder Image
          "links": [
            {
              "website": "Adidas",
              "url": "#", // Replace with actual URL
              "sizes": {
                "6": { "price": 175.00, "currency": "USD" },
                "7": { "price": 180.00, "currency": "USD" },
                "8": { "price": 190.00, "currency": "USD" }
              }
            },
            {
              "website": "Finish Line",
              "url": "#", // Replace with actual URL
              "sizes": {
                "7": { "price": 185.00, "currency": "USD" },
                "8": { "price": 190.00, "currency": "USD" },
                "10": { "price": 195.00, "currency": "USD" }
              }
            }
          ]
        },
         {
          "color": "Pink/Grey",
          "image": "https://via.placeholder.com/150/FFC0CB/808080?text=Pink/Grey", // Placeholder Image
          "links": [
            {
              "website": "Adidas",
              "url": "#", // Replace with actual URL
              "sizes": {
                "7": { "price": 185.00, "currency": "USD" },
                "9": { "price": 190.00, "currency": "USD" }
              }
            }
          ]
        }
      ],
      "description": "Comfortable running shoe with boost technology for women."
    },
    {
      "model": "Chuck Taylor All Star",
      "gender": "unisex",
      "colorways": [
        {
          "color": "Black",
          "image": "https://via.placeholder.com/150/000000/FFFFFF?text=Black", // Placeholder Image
          "links": [
            {
              "website": "Converse",
              "url": "#", // Replace with actual URL
              "sizes": {
                "6": { "price": 55.00, "currency": "USD" },
                "8": { "price": 60.00, "currency": "USD" }
              }
            },
            {
              "website": "Amazon",
              "url": "#", // Replace with actual URL
              "sizes": {
                "7": { "price": 50.00, "currency": "USD" },
                "8": { "price": 55.00, "currency": "USD" },
                "9": { "price": 55.00, "currency": "USD" }
              }
            }
          ]
        },
        {
          "color": "White",
          "image": "https://via.placeholder.com/150/FFFFFF/000000?text=White", // Placeholder Image
          "links": [
            {
              "website": "Converse",
              "url": "#", // Replace with actual URL
              "sizes": {
                "10": { "price": 60.00, "currency": "USD" }
              }
            }
          ]
        }
      ],
      "description": "The iconic canvas sneaker."
    }
  ]
};

// Function to format currency
function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}

// Function to generate shoe listings
function generateShoeListings(shoes) {
    const listingsContainer = document.getElementById('shoe-listings');
    if (!listingsContainer) return; // Exit if container not found

    listingsContainer.innerHTML = ''; // Clear existing content

    shoes.forEach(shoe => {
        // Create main card element
        const shoeCard = document.createElement('div');
        shoeCard.className = 'shoe-card';

        // Card Header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'shoe-card-header';
        cardHeader.innerHTML = `
            <h2>${shoe.model}</h2>
            <span class="shoe-gender">${shoe.gender}</span>
            <p class="shoe-description">${shoe.description}</p>
        `;
        shoeCard.appendChild(cardHeader);

        // Colorways Container
        const colorwaysContainer = document.createElement('div');
        colorwaysContainer.className = 'shoe-colorways';

        shoe.colorways.forEach(colorway => {
            const colorwayElement = document.createElement('div');
            colorwayElement.className = 'colorway';

            // Colorway Header (Image & Name)
            const colorwayHeader = document.createElement('div');
            colorwayHeader.className = 'colorway-header';
            colorwayHeader.innerHTML = `
                <img src="${colorway.image}" alt="${shoe.model} - ${colorway.color}" class="colorway-image">
                <span class="colorway-name">${colorway.color}</span>
            `;
            colorwayElement.appendChild(colorwayHeader);

            // --- Size and Price Logic ---
            const sizePriceSection = document.createElement('div');
            sizePriceSection.className = 'size-price-section';
            sizePriceSection.innerHTML = `<h4>Available Sizes & Prices:</h4>`;

            const allSizes = new Set(); // Use a Set to get unique sizes
            colorway.links.forEach(link => {
                Object.keys(link.sizes).forEach(size => allSizes.add(size));
            });

            // Sort sizes numerically (handle potential non-numeric sizes gracefully)
            const sortedSizes = Array.from(allSizes).sort((a, b) => {
                const numA = parseFloat(a);
                const numB = parseFloat(b);
                if (!isNaN(numA) && !isNaN(numB)) {
                    return numA - numB;
                }
                return a.localeCompare(b); // Fallback for non-numeric sizes
            });


            if (sortedSizes.length === 0) {
                 sizePriceSection.innerHTML += `<p>No size information available for this colorway.</p>`;
            } else {
                // Loop through each unique size available for this colorway
                sortedSizes.forEach(size => {
                    const sizeBlock = document.createElement('div');
                    sizeBlock.className = 'size-block';
                    sizeBlock.innerHTML = `<div class="size-header">Size: ${size}</div>`;

                    const vendorList = document.createElement('ul');
                    vendorList.className = 'vendor-price-list';

                    let pricesForSize = []; // Store {vendor, price, url, currency} for this size

                    // Collect prices for the current size from all vendors
                    colorway.links.forEach(link => {
                        if (link.sizes[size]) {
                            pricesForSize.push({
                                vendor: link.website,
                                price: link.sizes[size].price,
                                currency: link.sizes[size].currency,
                                url: link.url // In a real scenario, you might need a size-specific URL if available
                            });
                        }
                    });

                    // Find the minimum price for this size
                    let minPrice = Infinity;
                    if (pricesForSize.length > 0) {
                        minPrice = Math.min(...pricesForSize.map(p => p.price));
                    }

                    // Create list items for each vendor offering this size
                    pricesForSize.forEach(offer => {
                        const listItem = document.createElement('li');
                        listItem.className = 'vendor-price-item';

                        const isCheapest = offer.price === minPrice && pricesForSize.length > 0;
                        const priceFormatted = formatCurrency(offer.price, offer.currency);

                        listItem.innerHTML = `
                            <a href="${offer.url}" target="_blank" class="vendor-link">
                                ${offer.vendor} <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                            <span class="price ${isCheapest ? 'cheapest' : ''}">${priceFormatted}</span>
                        `;
                        vendorList.appendChild(listItem);
                    });

                    sizeBlock.appendChild(vendorList);
                    sizePriceSection.appendChild(sizeBlock);
                });
             }


            colorwayElement.appendChild(sizePriceSection);
            // --- End Size and Price Logic ---

            colorwaysContainer.appendChild(colorwayElement);
        });

        shoeCard.appendChild(colorwaysContainer);
        listingsContainer.appendChild(shoeCard);
    });
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    generateShoeListings(shoeData.shoes);
});