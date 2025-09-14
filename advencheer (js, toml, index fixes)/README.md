# AdvenCheers Travel Website

A beautifully designed travel lifestyle, foodie, and photography website showcasing curated travel experiences and adventures around the world.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations and hover effects
- **Interactive Navigation**: Smooth scrolling navigation with dynamic header styling
- **Destination Showcase**: Beautiful grid layouts for destinations and travel experiences
- **Testimonials**: Customer feedback section with elegant card designs
- **Blog Integration**: Travel stories and insights section
- **Contact Information**: Easy-to-find contact details and booking options

## 📁 Project Structure

```
advencheers-travel/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── main.css          # Primary styles
│   │   └── responsive.css    # Mobile and responsive styles
│   ├── js/
│   │   └── main.js          # JavaScript functionality
│   ├── images/
│   │   ├── hero/            # Hero section images
│   │   ├── portfolio/       # Destination and travel images
│   │   ├── testimonials/    # Customer and team images
│   │   └── logos/           # Brand logos and icons
│   └── fonts/               # Custom font files (if needed)
├── components/
│   ├── header.html          # Reusable header component
│   └── footer.html          # Reusable footer component
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or download** this repository to your local machine

2. **Add Images**: Place your travel images in the appropriate directories:
   - Hero images: `assets/images/hero/`
   - Destination photos: `assets/images/portfolio/`
   - Team photos: `assets/images/testimonials/`
   - Logos: `assets/images/logos/`

3. **Update Image References**: Replace the placeholder image paths in `index.html` with your actual image filenames

4. **Customize Content**: 
   - Update company information, contact details, and destinations
   - Modify colors, fonts, and styling in `assets/css/main.css`
   - Add your own travel content and testimonials

### Running the Website

#### Option 1: Direct File Opening
Simply open `index.html` in your web browser by double-clicking the file.

#### Option 2: Local Server (Recommended)
For better development experience and to avoid CORS issues:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server .
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors
The main color scheme uses:
- Primary: `#2c5aa0` (Blue)
- Secondary: `#667eea` (Light Blue)
- Accent: `#764ba2` (Purple)
- Success: `#28a745` (Green)

Update these in `assets/css/main.css` to match your brand.

### Fonts
The website uses Arial as the primary font. To use custom fonts:
1. Add font files to `assets/fonts/`
2. Update the CSS `@font-face` declarations
3. Modify the `font-family` properties

### Content
- Edit destinations in the destinations section
- Update testimonials with real customer feedback
- Modify the about section with your company story
- Add your blog/Medium URL in the blog section

## 📱 Responsive Breakpoints

- **Mobile**: 768px and below
- **Tablet**: 769px to 1023px
- **Desktop**: 1024px and above
- **Large Desktop**: 1400px and above

## 🔧 JavaScript Features

- Smooth scrolling navigation
- Dynamic header styling on scroll
- Scroll-triggered animations
- Interactive card hover effects
- External link handling

## 📞 Support

For questions or support regarding this website template:

- **Email**: info@advencheers.com
- **Phone**: 1-800-ADVENCHEERS

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues or pull requests to improve the website.

---

**Happy Traveling!** 🌍✈️