emailjs.init("6y1jn3KXX1A9-7gWH");

// This array stores the services the user has added to the cart
let cartItems = [];

// Price lookup for each service
const priceMap = {
    "Dry Cleaning": 200,
    "Wash & Fold": 100,
    "Ironing": 30,
    "Stain Removal": 500,
    "Leather & Suede Cleaning": 999,
    "Wedding Dress Cleaning": 2800
};

// Called when user clicks "Add Item" button
function addItem(name, price) {
    // Check if item is already in cart
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name === name) return;
    }

    cartItems.push({ name: name, price: price });
    updateButton(name, true);
    renderCart();
}

// Called when user clicks "Remove Item" button
function removeItem(name) {
    let newCart = [];
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].name !== name) {
            newCart.push(cartItems[i]);
        }
    }
    cartItems = newCart;

    updateButton(name, false);
    renderCart();
}

// Updates the button text and style for a service
function updateButton(name, isInCart) {
    const btn = document.getElementById("btn-" + name);
    if (!btn) return;

    if (isInCart) {
        btn.innerHTML = "Remove Item <ion-icon name='remove-circle-outline'></ion-icon>";
        btn.className = "remove-btn";
        btn.onclick = () => removeItem(name);
    } else {
        btn.innerHTML = "Add Item <ion-icon name='add-circle-outline'></ion-icon>";
        btn.className = "add-btn";
        btn.onclick = () => addItem(name, priceMap[name]);
    }
}

// Updates the cart table on the right side
function renderCart() {
    const tbody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total-amount");
    const bookBtn = document.getElementById("book-btn");

    tbody.innerHTML = "";

    if (cartItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="empty-cart">'
            + '<div style="font-size:1.4rem;">&#9432;</div>'
            + 'No Items Added<br>'
            + '<small>Add items to the cart from the services bar</small>'
            + '</td></tr>';

        bookBtn.disabled = true;
        totalEl.textContent = "₹ 0";

    } else {
        bookBtn.disabled = false;

        for (let i = 0; i < cartItems.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML = "<td>" + (i + 1) + "</td>"
                + "<td>" + cartItems[i].name + "</td>"
                + "<td>₹" + cartItems[i].price + ".00</td>";
            tbody.appendChild(row);
        }

        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].price;
        }
        totalEl.textContent = "₹ " + total.toFixed(2);
    }
}

// Called when user clicks the Book Now button
function handleBooking() {
    const msgEl = document.getElementById("booking-msg");
    const name = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email-id").value.trim();
    const phone = document.getElementById("phone-number").value.trim();

    // Check if cart is empty
    if (cartItems.length === 0) {
        msgEl.textContent = "⚠ Add the items to the cart to book";
        msgEl.className = "booking-msg error";
        return;
    }

    // Check if fields are empty
    if (name === "" || email === "" || phone === "") {
        msgEl.textContent = "⚠ Please fill in all the fields";
        msgEl.className = "booking-msg error";
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        msgEl.textContent = "⚠ Please enter a valid email address";
        msgEl.className = "booking-msg error";
        return;
    }

    // Validate phone — must be 10 digits
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        msgEl.textContent = "⚠ Please enter a valid 10-digit phone number";
        msgEl.className = "booking-msg error";
        return;
    }

    // Build services list string for the email
    let serviceList = "";
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        serviceList += (i + 1) + ". " + cartItems[i].name + " - Rs." + cartItems[i].price + "\n";
        total += cartItems[i].price;
    }

    // Send confirmation email via EmailJS
    const templateParams = {
        to_name: name,
        to_email: email,
        phone: phone,
        services: serviceList,
        total: "Rs." + total.toFixed(2)
    };

    emailjs.send("service_5flt0rw", "template_f6l8z0t", templateParams)
        .then(() => {
            msgEl.textContent = "✔ Thank you For Booking the Service We will get back to you soon!";
            msgEl.className = "booking-msg success";
            clearForm();
        })
        .catch((error) => {
            msgEl.textContent = "⚠ Something went wrong. Please try again.";
            msgEl.className = "booking-msg error";
            console.log("EmailJS error:", error);
        });
}

// Clears form inputs and resets cart
function clearForm() {
    document.getElementById("full-name").value = "";
    document.getElementById("email-id").value = "";
    document.getElementById("phone-number").value = "";
    resetCart();
}

// Resets all cart items and buttons back to default
function resetCart() {
    for (let i = 0; i < cartItems.length; i++) {
        updateButton(cartItems[i].name, false);
    }
    cartItems = [];
    renderCart();
}

// Newsletter subscribe handler
function handleSubscribe() {
    alert("Thank you for subscribing to our newsletter!");
}

// Show empty cart state on page load
renderCart();