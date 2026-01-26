# Zaho Corporate Website

A fully responsive, bilingual (Arabic/English) corporate website for Zaho, built with Tailwind CSS.

## Features

- ✅ Fully responsive design (Desktop, Tablet, Mobile)
- ✅ Bilingual support (Arabic/English) with language switcher
- ✅ All required sections: Header, Hero, About, Services, Solutions, Partners, CTA, Footer
- ✅ Contact form ready for EmailJS or Formspree integration
- ✅ Clean folder structure
- ✅ Modern UI with Tailwind CSS
- ✅ Smooth scrolling navigation
- ✅ Mobile-friendly menu

## Folder Structure

```
zaho/
├── index.html          # Main homepage
├── contact.html        # Contact page
├── assets/
│   ├── css/
│   │   └── tailwind.css    # Custom Tailwind styles
│   ├── js/
│   │   └── main.js         # JavaScript for interactivity
│   └── images/             # Images and logos
└── README.md          # This file
```

## Setup Instructions

### 1. Basic Setup

1. Clone or download this repository
2. Open `index.html` in a web browser
3. The website should work immediately with Tailwind CDN

### 2. Contact Form Setup

The contact form needs to be configured to send emails. Choose one of the following options:

#### Option A: Using Formspree (Recommended - Easiest)

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form
3. Copy your Formspree form ID
4. Open `assets/js/main.js`
5. Find the line: `const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {`
6. Replace `YOUR_FORMSPREE_ID` with your actual Formspree form ID
7. The form will now send emails to the address you configured in Formspree

#### Option B: Using EmailJS

1. Go to [EmailJS.com](https://www.emailjs.com) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Public Key, Service ID, and Template ID
5. Open `assets/js/main.js`
6. Uncomment the EmailJS initialization line and add your public key:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
7. Update the emailjs.send() call with your Service ID and Template ID
8. Configure the template to send emails to: info@zaho.ly

### 3. Adding Your Logo

1. Place your logo image in `assets/images/logo.png`
2. The website will automatically use it
3. If the logo doesn't exist, it will show "ZAHO" text instead

### 4. Customizing Content

All text content is in both Arabic and English. To update:

1. Open `index.html`
2. Find the section you want to edit
3. Look for elements with classes `lang-ar` and `lang-en`
4. Update the text inside these elements

### 5. Adding Images

1. Place images in `assets/images/`
2. Update image paths in HTML where needed
3. Currently using emoji icons as placeholders - replace with actual images as needed

## Customization

### Colors

The website uses a blue color scheme. To change colors:

1. Search for `bg-blue-600`, `text-blue-600`, etc. in the HTML files
2. Replace with your preferred Tailwind color classes
3. Common colors: `blue`, `green`, `purple`, `red`, `orange`, `indigo`

### Fonts

The website uses system fonts. To add custom fonts:

1. Add font imports in the `<head>` section
2. Update the font-family in `assets/css/tailwind.css`

### Sections

All sections are clearly marked with IDs:
- `#home` - Hero section
- `#about` - About section
- `#services` - Services section
- `#solutions` - Solutions by sector
- `#partners` - Partners section
- `#contact` - Contact form in footer

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The website uses Tailwind CSS via CDN for easy setup
- For production, consider using Tailwind CLI for optimized CSS
- All placeholder content should be replaced with actual company information
- Phone numbers and addresses are placeholders - update them in the footer section
- Partner logos are placeholders - add actual partner logos in the Partners section

## Support

For questions or issues, please contact: info@zaho.ly

## License

© 2024 Zaho. All rights reserved.

