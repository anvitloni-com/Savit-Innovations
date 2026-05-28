const products = [
    { 
        id: "AH-001", 
        name: "Premium Series AH-001", 
        category: "handels", 
        img: "AH 001 CP SATIN (1).jpg", // Change this filename to match your image path
        colorOptions: ["CP-SATIN", "RG-BS"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "CP-SATIN", size: "96mm", price: "219" },
            { color: "CP-SATIN", size: "160mm", price: "213" },
            { color: "CP-SATIN", size: "224mm", price: "457" },
            { color: "CP-SATIN", size: "288mm", price: "67" },
            { color: "RG-BS", size: "96mm", price: "76" },
            { color: "RG-BS", size: "160mm", price: "" },
            { color: "RG-BS", size: "224mm", price: "" },
            { color: "RG-BS", size: "288mm", price: "" }
        ]
    },
    { 
        id: "AH-006", 
        name: "Designer Series AH-006", 
        category: "handels", 
        img: "AH 006  (1).png",
        colorOptions: ["Satin", "Rose Gold", "Titanium", "Chrome"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "Satin", size: "96mm", price: "" },
            { color: "Rose Gold", size: "96mm", price: "" },
            { color: "Titanium", size: "96mm", price: "" },
            { color: "Chrome", size: "96mm", price: "" }
            // Add more sizes for each color as needed
        ]
    },
    { 
        id: "AH-009", 
        name: "Luxury Series AH-009", 
        category: "handels", 
        img: "AH 009 GOLD-BLACK (1).jpg",
        colorOptions: ["GOLD-BLACK", "RG-BS"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "GOLD-BLACK", size: "96mm", price: "" },
            { color: "GOLD-BLACK", size: "160mm", price: "" },
            { color: "GOLD-BLACK", size: "224mm", price: "" },
            { color: "GOLD-BLACK", size: "288mm", price: "" },
            { color: "RG-BS", size: "96mm", price: "" },
            { color: "RG-BS", size: "160mm", price: "" },
            { color: "RG-BS", size: "224mm", price: "" },
            { color: "RG-BS", size: "288mm", price: "" }
        ]
    },
    { 
        id: "AH-018", 
        name: "Elite Series AH-018", 
        category: "handels", 
        img: "AH 018 CHOCO BS (1).jpg",
        colorOptions: ["CHOCO-BS", "GOLD-BLACK"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "CHOCO-BS", size: "96mm", price: "" },
            { color: "CHOCO-BS", size: "160mm", price: "" },
            { color: "CHOCO-BS", size: "224mm", price: "" },
            { color: "CHOCO-BS", size: "288mm", price: "" },
            { color: "GOLD-BLACK", size: "96mm", price: "" },
            { color: "GOLD-BLACK", size: "160mm", price: "" },
            { color: "GOLD-BLACK", size: "224mm", price: "" },
            { color: "GOLD-BLACK", size: "288mm", price: "" }
        ]
    },
    { 
        id: "AH-024", 
        name: "Twist Series AH-024", 
        category: "handels", 
        img: "AH 024 CP (1).jpg",
        colorOptions: ["CP", "SATIN", "ROSE-GOLD"],
        sizeOptions: ["96mm", "160mm", "224mm", "288mm"],
        variants: [
            { color: "CP", size: "96mm", price: "" },
            { color: "CP", size: "160mm", price: "" },
            { color: "SATIN", size: "96mm", price: "" },
            { color: "SATIN", size: "160mm", price: "" },
            { color: "ROSE-GOLD", size: "96mm", price: "" },
            { color: "ROSE-GOLD", size: "288mm", price: "" }
        ]
    }
];

let cart = [];
let currentCategory = 'all';

function initProducts(list = products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    list.forEach(p => {
        const defaultPrice = p.variants[0].price || "Pending";
        grid.innerHTML += `
            <div class="product-card">
                <div class="sale-badge">55% OFF</div>
                
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.id}</h3>
                <p class="price">₹<span id="display-price-${p.id}">${defaultPrice}</span></p>
                <div class="selectors">
                    <div class="select-group">
                        <label>Finish</label>
                        <select id="color-${p.id}" onchange="updateVariantPrice('${p.id}')">
                            ${p.colorOptions.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <div class="select-group">
                        <label>Size</label>
                        <select id="size-${p.id}" onchange="updateVariantPrice('${p.id}')">
                            ${p.sizeOptions.map(s => `<option value="${s}">${s}</option>`).join('')}
                        </select>
                    </div>
                </div>
                <div class="qty-container">
                    <button class="qty-btn" onclick="adjustQty('${p.id}', -1)">-</button>
                    <input type="number" id="qty-${p.id}" class="qty-input" value="1" min="1">
                    <button class="qty-btn" onclick="adjustQty('${p.id}', 1)">+</button>
                </div>
                <button class="add-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
            </div>`;
    });
}


function updateVariantPrice(pId) {
    const p = products.find(x => x.id === pId);
    const color = document.getElementById(`color-${pId}`).value;
    const size = document.getElementById(`size-${pId}`).value;
    const variant = p.variants.find(v => v.color === color && v.size === size);
    document.getElementById(`display-price-${pId}`).innerText = variant && variant.price !== "" ? variant.price : "Pending";
}

function adjustQty(id, change) {
    let input = document.getElementById(`qty-${id}`);
    let val = parseInt(input.value) + change;
    if(val >= 1) input.value = val;
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);
    const color = document.getElementById(`color-${id}`).value;
    const size = document.getElementById(`size-${id}`).value;
    const variant = p.variants.find(v => v.color === color && v.size === size);
    
    if(!variant || variant.price === "") {
        alert("Price for this selection is not set yet.");
        return;
    }

    const price = parseFloat(variant.price);
    cart.push({ id, name: p.name, qty, color, size, price, subtotal: price * qty });
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('active');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    let total = 0;
    itemsDiv.innerHTML = '';
    
    cart.forEach((item, index) => {
        total += item.subtotal;
        itemsDiv.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.id}</strong><br>
                    <small>${item.color} | ${item.size} | Qty: ${item.qty}</small>
                </div>
                <div>
                    ₹${item.subtotal} 
                    <i class="fas fa-trash remove-btn" onclick="removeItem(${index})"></i>
                </div>
            </div>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function setCategory(cat, btn) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
}

function filterProducts() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => {
        const matchCat = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.id.toLowerCase().includes(term);
        return matchCat && matchSearch;
    });
    initProducts(filtered);
}

function checkoutWhatsApp() {
    if(cart.length === 0) return alert("Cart is empty");
    let msg = "*ORDER FROM SAVIT INNOVATIONS*%0a%0a";
    cart.forEach((item, i) => {
        msg += `${i+1}. *${item.id}*%0a- Finish: ${item.color}%0a- Size: ${item.size}%0a- Qty: ${item.qty}%0a- Total: ₹${item.subtotal}%0a%0a`;
    });
    msg += `*GRAND TOTAL: ₹${document.getElementById('cart-total').innerText}*`;
    window.open(`https://wa.me/919980056119?text=${msg}`);
}

window.onload = () => initProducts();
