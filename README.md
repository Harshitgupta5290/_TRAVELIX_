# TRAVELIX — Clever Traveler

A full-stack travel booking web application built with **PHP** and **MySQL**. TRAVELIX lets users discover hotels, browse travel packages, book rooms, and manage their trips — all through a clean, Bootstrap-powered interface. Admins get a dedicated dashboard to manage every aspect of the platform.

---

## Features

### For Users
- **Home Page** — Hero banner slider (Flights, Hotels, Bus), featured hotels with pricing, room gallery, and a contact form
- **Travel Packages** — Search by source, destination, number of days, and category; browse package categories with images
- **Hotel Listings** — View available hotels with images and details
- **Room Browsing** — Explore luxurious and affordable room options
- **User Registration & Login** — Secure session-based authentication
- **My Account** — Personal dashboard with booking history and account settings
- **Payments** — Credit/debit card payment flow for package bookings
- **Feedback** — Submit travel feedback
- **FAQ** — Browse frequently asked questions
- **Travel Mate** — Integrated travel companion feature
- **Contact Form** — Get in touch with the platform

### For Admins
- **User Management** — View and manage all registered users
- **Category Management** — Add/edit travel categories
- **Hotel Management** — Add new hotels and view the full hotel list
- **Package Management** — Create and manage travel packages
- **Booking Management** — View all platform bookings
- **Feedback & Contact Lists** — Review user feedback and contact submissions
- **FAQ Management** — Add and edit FAQ entries
- **Change Password** — Secure password update

---

## Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Backend    | PHP (procedural)                    |
| Database   | MySQL (`clever_travelers`)          |
| Frontend   | HTML5, CSS3, Bootstrap 3            |
| JavaScript | jQuery, custom scripts              |
| Icons      | Font Awesome                        |
| Slider     | da-slider (CSS3 content slider)     |
| Maps       | Google Maps Embed API               |

---

## Project Structure

```
Travelix/
├── index.php              # Home page with hotel listing & contact form
├── about.php              # About the platform
├── package.php            # Package search and category browser
├── package_details.php    # Individual package details
├── hotel-list.php         # Full hotel listing
├── hotel-details.php      # Individual hotel details
├── register.php           # User registration
├── login.php              # User login
├── logout.php             # Session logout
├── myaccount.php          # User account dashboard
├── booking_history.php    # User's past bookings
├── payments.php           # Payment processing
├── feedback.php           # User feedback form
├── faq.php                # FAQ page
├── changepassword.php     # Password change
├── add_hotel.php          # Admin: add hotel
├── add_package.php        # Admin: add package
├── booking_list.php       # Admin: all bookings
├── user_list.php          # Admin: all users
├── category.php           # Admin: manage categories
├── package_list.php       # Admin: manage packages
├── hotel-list.php         # Admin: manage hotels
├── feedback_list.php      # Admin: view feedback
├── contact_list.php       # Admin: view contacts
├── faq-list.php           # Admin/User: view FAQs
├── edit_faq.php           # Admin: edit FAQ entries
├── dbconfigur.php         # Database connection & session config
├── header.php             # Shared navigation bar
├── footer.php             # Shared footer
├── leftmenu.php           # Role-based sidebar menu
├── title.php              # Shared CSS/JS includes
├── css/                   # Stylesheets (Bootstrap, Font Awesome, custom)
├── js/                    # JavaScript files (jQuery, Bootstrap, custom)
├── images/                # Static images (hotels, rooms, banners)
└── uploads/               # User-uploaded files
```

---

## Getting Started

### Prerequisites
- PHP >= 7.x
- MySQL >= 5.7
- A local server stack — [XAMPP](https://www.apachefriends.org/), [WAMP](https://www.wampserver.com/), or [Laragon](https://laragon.org/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harshitgupta5290/_TRAVELIX_.git
   ```

2. **Move to your server's web root**
   ```bash
   # XAMPP example
   cp -r _TRAVELIX_/Travelix /opt/lampp/htdocs/travelix
   ```

3. **Create the database**
   - Open **phpMyAdmin** (or your MySQL client)
   - Create a database named `clever_travelers`
   - Import the provided SQL dump file

4. **Configure the database connection**

   Open [Travelix/dbconfigur.php](Travelix/dbconfigur.php) and update the credentials:
   ```php
   $hostName   = "localhost";
   $dbUsername = "root";
   $dbPassword = "your_password";
   $dbName     = "clever_travelers";
   ```

5. **Start your local server and visit**
   ```
   http://localhost/travelix/index.php
   ```

### Default Admin Login
Set up an admin user directly in the `users` table with `user_type = 'admin'`.

---

## Screenshots

> Add screenshots of the home page, package search, admin dashboard, and payment page here.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## License

This project is open source and available under the [MIT License](LICENSE).
