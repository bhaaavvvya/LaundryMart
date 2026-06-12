# Laundry Mart 🧺
### One Stop Laundry Solution
 
A front-end web application for a laundry service business. Users can browse available services, add them to a cart, and submit a booking with their contact details.
 
---
 
## Features
 
- Responsive navigation bar with smooth scroll links
- Hero section with a call-to-action button
- Service achievements banner (15+ services, 240+ customers, 2+ years)
- Booking section where users can add/remove services to a cart
- Dynamic cart that updates the total amount in real time
- Booking form with basic validation
- Success/error messages on form submission
- Quality highlights section
- Newsletter subscription section
- Footer with important links, contact info, and social media icons
---
 
## Tech Stack
 
- **HTML5** — page structure
- **CSS3** — styling and layout (Flexbox)
- **JavaScript (Vanilla)** — cart logic, form validation, DOM manipulation
- **Ionicons** — icons throughout the page
---
 
## Folder Structure
 
```
laundrymart/
│
├── index.html       # Main HTML file
├── styles.css       # All styling
├── script.js        # Cart logic and form handling
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
   - If cart is empty → red warning shown
   - If any field is blank → red warning shown
   - If everything is filled → green success message shown and form resets
---
 
## Credits
 
- Icons by [Ionicons](https://ionic.io/ionicons)
- Built as part of a web development assignment
 