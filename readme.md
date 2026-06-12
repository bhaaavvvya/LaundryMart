# Laundry Mart 🧺
### One Stop Laundry Solution

A front-end web application for a laundry service business. Users can browse available services, add them to a cart, fill in their details, and receive a real booking confirmation email.

---

## Features

- Responsive navigation bar with smooth scroll links
- Hero section with a "Book a Service Today" button that scrolls to the booking section
- Service achievements banner (15+ services, 240+ customers, 2+ years)
- Booking section with add/remove services, dynamic cart, and live total calculation
- Booking form with email format and phone number validation
- Real confirmation email sent to the user via EmailJS on successful booking
- Success and error messages shown below the Book Now button
- Quality highlights section (Premium, Support, Delivery, Affordable)
- Newsletter subscription section
- Footer with important links, contact info, and social media icons

---

## Tech Stack

- **HTML5** — page structure
- **CSS3** — styling and layout (Flexbox)
- **JavaScript (Vanilla)** — cart logic, form validation, DOM manipulation
- **EmailJS** — sends confirmation email to user on booking
- **Ionicons** — icons throughout the page

---

## Folder Structure

```
laundrymart/
│
├── index.html       # Main HTML file
├── styles.css       # All styling
├── script.js        # Cart logic, validation, and EmailJS integration
├── README.md        # Project documentation
└── images/
    └── laundry.jpg  # Hero section image
```

---

## How to Run

1. Download or clone the project folder
2. Make sure the `images/` folder has `laundry.jpg` inside it
3. Open `index.html` in any browser — no server needed

---

## Sections Overview

| Section | Description |
|---|---|
| Navbar | Logo, nav links, username button |
| Hero | Heading, description, Book a Service button |
| Achievements | 15+ services, 240+ customers, 2+ years |
| Booking | Services list with add/remove, cart, booking form |
| Quality | Premium services, quick support, delivery, pricing |
| Newsletter | Name and email subscription form |
| Footer | Links, contact details, social icons |

---

## Booking Flow

1. User clicks **Add Item** next to a service → it appears in the cart
2. Total amount updates automatically
3. User fills in Full Name, Email, and Phone Number
4. User clicks **Book Now**
   - If cart is empty → red warning: *"Add the items to the cart to book"*
   - If any field is blank → red warning: *"Please fill in all the fields"*
   - If email format is wrong → red warning: *"Please enter a valid email address"*
   - If phone is not 10 digits → red warning: *"Please enter a valid 10-digit phone number"*
   - If everything is valid → confirmation email is sent via EmailJS, green success message shown, form and cart reset

---

## EmailJS Setup

This project uses [EmailJS](https://www.emailjs.com) to send booking confirmation emails. The following are already configured in `script.js`:

- **Public Key** — links to the EmailJS account
- **Service ID** — the connected Gmail service
- **Template ID** — the email template with booking details

The email template uses these variables:
- `{{to_name}}` — customer's full name
- `{{to_email}}` — customer's email address
- `{{phone}}` — customer's phone number
- `{{services}}` — list of booked services with prices
- `{{total}}` — total booking amount

---

## Credits

- Icons by [Ionicons](https://ionic.io/ionicons)
- Email service by [EmailJS](https://www.emailjs.com)
- Built as part of a web development assignment