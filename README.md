# Vishvanshu Chauhan — Neon Portfolio

A futuristic, neon-themed portfolio website showcasing projects, skills, and contact information. Built with HTML, CSS, and JavaScript.

## Features

- **Cyberpunk Loader**: A visually appealing loading screen with glitch effects.
- **Responsive Design**: Fully responsive layout for all devices.
- **Interactive Elements**:
  - Floating particles background.
  - Magnetic hover effects.
  - Command palette for quick navigation (Ctrl/Cmd + K).
- **Skills Section**: Animated skill bars with percentage indicators.
- **Projects Showcase**: Highlighted projects with hover interactions.
- **Live GitHub Stats**: Fetches and displays GitHub stats dynamically.
- **Contact Form**: Integrated with EmailJS for sending messages.

## Folder Structure

```
Portfolio/
├── index.html          # Main HTML file
├── style.css           # Stylesheet for the website
├── script.js           # JavaScript for interactivity
├── assets/             # Assets folder
│   ├── Vishvanshu_resume.pdf
│   └── Vishvanshu.jpg
```

## How to Use

1. Clone the repository or download the files.
2. Open `index.html` in your browser to view the portfolio.
3. Replace placeholders in `script.js` with your EmailJS credentials:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   ```
4. Update the GitHub username in `script.js`:
   ```javascript
   const GITHUB_USERNAME = 'chauhanvishvanshu';
   ```

## Technologies Used

- **HTML5**: Structure of the website.
- **CSS3**: Styling with animations and responsive design.
- **JavaScript**: Interactivity and dynamic content.
- **EmailJS**: For sending messages via the contact form.
- **GitHub API**: Fetching live GitHub stats.

## Screenshots

### Hero Section
![Hero Section](assets/Vishvanshu.jpg)

### Skills Section
![Skills Section](assets/Vishvanshu_resume.pdf)

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

Made with ❤️ by Vishvanshu Chauhan