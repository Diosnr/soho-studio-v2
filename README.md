# Soho Studio v2

Premium fashion brand website with members-only lookbook access.

## Live Site

🌐 **[https://diosnr.github.io/soho-studio-v2/](https://diosnr.github.io/soho-studio-v2/)**

## Features

### Pages
- **Home**: Hero section, lookbook preview grid (6 photos), about section, featured collection, newsletter signup
- **Login/Signup**: Email validation, 8+ character password requirement, localStorage authentication, inline error handling, remember me toggle
- **Members Lookbook**: 9 full-width fashion photos, login-protected (redirects to login if not authenticated)

### Design
- **Color Palette**: Black, white, and gold
- **Typography**: 
  - Cormorant Garamond for headings (editorial luxury)
  - Inter for body text (clean readability)
- **Aesthetic**: Editorial luxury, no gradients, smooth scroll animations

### Authentication System
- Client-side authentication using localStorage
- Email validation with regex
- Password minimum 8 characters
- Remember me functionality (localStorage vs sessionStorage)
- Session expiry after 24 hours
- Protected routes with automatic redirect

### Animations
- Smooth scroll animations on all sections
- Fade-in effects on page load
- Intersection Observer for scroll-triggered animations
- Image hover effects with scale transforms
- Lazy loading for optimized performance

## Tech Stack

- Pure HTML5, CSS3, JavaScript (no frameworks)
- Google Fonts (Cormorant Garamond, Inter)
- Unsplash images for fashion photography
- localStorage for authentication and data persistence
- GitHub Pages for hosting

## File Structure

```
soho-studio-v2/
├── index.html              # Home page
├── login.html              # Login/signup page
├── lookbook.html           # Members-only lookbook
├── styles.css              # Complete styling
├── script.js               # Main interactions and animations
├── auth.js                 # Authentication logic
├── lookbook-auth.js        # Lookbook access guard
└── README.md               # Documentation
```

## Authentication Flow

1. User signs up with name, email, and password (8+ chars)
2. Credentials stored in localStorage under `sohoUsers`
3. On login, auth token stored in localStorage (remember me) or sessionStorage
4. Lookbook page checks for valid auth token on load
5. If no token or expired, redirects to login
6. Logout clears auth data and redirects to home

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Diosnr/soho-studio-v2.git
cd soho-studio-v2
```

2. Open `index.html` in a browser or use a local server:
```bash
python -m http.server 8000
# or
npx serve
```

3. Visit `http://localhost:8000`

## Deployment

Deployed automatically via GitHub Pages from the `main` branch.

Any push to `main` triggers automatic deployment.

## Design Assumptions

- Fashion images sourced from Unsplash (high-quality, royalty-free)
- Prices displayed in Nigerian Naira (₦)
- Newsletter subscriptions stored locally (no backend integration)
- Authentication is client-side only (suitable for demo/prototype)
- Mobile-responsive design with breakpoints at 1024px and 768px

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Credits

Built by Handler for Irunor
Fashion photography via Unsplash

---

© 2024 Soho Studio. All rights reserved.