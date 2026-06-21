let cartItems = [];

const priceMap = {
    "Dry Cleaning": 200,
    "Wash & Fold": 100,
    "Ironing": 30,
    "Stain Removal": 500,
    "Leather & Seude Cleaning": 999,
    "Wedding Dress Cleaning": 2800
};

function addItem(name, price) {
    for(let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].name === name) {
            return;
        }
    }

    cartItems.push({name: name, price: price});
    updateButton(name, true);
    renderCart();
}

function removeItem(name) {
    let newCart = [];
    for(let i = 0; i < cartItems.length; i++) {
        if(cartItems[i].name !== name) {
            newCart.push(cartItems[i]);
        }
    }

    cartItems = newCart;
    updateButton(name, false);
    renderCart();
}

function updateButton(name, isInCart) {
    const btn = document.getElementById("btn-" + name);
    if(!btn) return;
    if(isInCart) {
        btn.innerHTML = "Remove Item";
        btn.style.color = "#e74c3c";
        btn.style.borderColor = "#e74c3c";
        btn.onclick = () => removeItem(name);
    }
    else {
        btn.innerHTML = "Add Item";
        btn.style.color = "#2196f3";
        btn.style.borderColor = "#2196f3";
        btn.onclick = () => addItem(name, priceMap[name]);
    }
}

function renderCart() {
    const tbody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total-amount");
    const bookBtn = document.getElementById("book-btn");

    tbody.innerHTML = "";

    if(cartItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan = "3" style = "text-align: center; padding: 15px; color: #aaa;">No Items Added</td></tr>';
        bookBtn.disabled = true;
    }

    else {
        bookBtn.disabled = false;
        for(let i = 0; i < cartItems.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML = "<td>" + (i + 1) + "</td>" 
                + "<td>" + cartItems[i].name + "</td>"
                + "<td>" + cartItems[i].price + "</td>";
            tbody.appendChild(row);
        }
    }

    let total = 0;
    for(let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].price;
    }
    totalEl.textContent = "₹ " + total;
}

function handleBooking() {
    const msgEl = document.getElementById("booking-msg");
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email-id").value.trim();
    const phone = document.getElementById("phone-number").value.trim();

    if (cartItems.length === 0) {
        msgEl.textContent = "⚠ Add the items to the cart to book";
        msgEl.style.color = "#e74c3c";
        return;
    }

    if (name === "") {
        msgEl.textContent = "⚠ Please enter your full name";
        msgEl.style.color = "#e74c3c";
        return;
    }
    
    if (email === "") {
        msgEl.textContent = "⚠ Please enter your email address";
        msgEl.style.color = "#e74c3c";
        return;
    }
    
    if (phone === "") {
        msgEl.textContent = "⚠ Please enter your phone number";
        msgEl.style.color = "#e74c3c";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        msgEl.textContent = "⚠ Please enter a valid email";
        msgEl.style.color = "#e74c3c";
        return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        msgEl.textContent = "⚠ Please enter a valid 10 digit phone number";
        msgEl.style.color = "#e74c3c";
        return;
    }

    let serviceList = "";
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        serviceList += (i + 1) + ". " + cartItems[i].name + " - Rs." + cartItems[i].price + "\n";
        total += cartItems[i].price;
    }
    const templateParams = {
        to_name: name,
        to_email: email,
        phone: phone,
        services: serviceList,
        total: "Rs." + total
    };
    emailjs.send("service_5flt0rw", "template_f6l8z0t", templateParams)
        .then(() => {
            msgEl.textContent = "✔ Thank you For Booking the Service We will get back to you soon!";
            msgEl.style.color = "#27ae60";
            clearForm();
        })
        .catch((error) => {
            msgEl.textContent = "⚠ Something went wrong. Please try again.";
            msgEl.style.color = "#e74c3c";
            console.log(error);
        });
}

function clearForm() {
    document.getElementById("full-name").value = "";
    document.getElementById("email-id").value = "";
    document.getElementById("phone-number").value = "";

    for (let i = 0; i < cartItems.length; i++) {
        updateButton(cartItems[i].name, false);
    }

    cartItems = [];
    renderCart();
}

function handleSubscribe() {
    const newsName = document.getElementById("news-name").value.trim();
    const newsEmail = document.getElementById("news-email").value.trim();
    const msgEl = document.getElementById("news-msg");

    if (newsName === "") {
        msgEl.textContent = "⚠ Please enter your name";
        msgEl.style.color = "#e74c3c";
        return;
    }
    
    if (newsEmail === "") {
        msgEl.textContent = "⚠ Please enter your email address";
        msgEl.style.color = "#e74c3c";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(newsEmail)) {
        msgEl.textContent = "⚠ Please enter a valid email";
        msgEl.style.color = "#e74c3c";
        return;
    }

    msgEl.textContent = "✔ Thank you for subscribing!";
    msgEl.style.color = "#27ae60";
    document.getElementById("news-name").value = "";
    document.getElementById("news-email").value = "";
}

emailjs.init("6y1jn3KXX1A9-7gWH");
renderCart();