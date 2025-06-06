# AI Color Palette Generator

A modern web application that generates color palettes using AI. Built with React and powered by Google's Gemini AI.

## Features

- 🎨 AI-powered color palette generation
- 💾 Save and manage your favorite palettes
- 📱 Fully responsive design
- 🔄 Real-time color updates
- 📋 One-click color code copying
- 🔐 User authentication
- 🌐 Progressive Web App support

## Technologies Used

- React.js
- Firebase (Authentication & Firestore)
- Google Gemini AI API
- Material-UI
- React Router
- Node.js/Express

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Google Cloud account with Gemini API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/color-palette-web.git
cd color-palette-web
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your configuration:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server:
```bash
npm start
```

5. In a separate terminal, start the backend server:
```bash
node server.js
```

## Usage

1. Open the application in your browser
2. Sign in or create an account
3. Enter a description of the color palette you want
4. Click "Generate" to create your palette
5. Click on any color to copy its hex code
6. Save your favorite palettes for later use

## API Documentation

### Color Generation Endpoint

```
POST /api/colors
Content-Type: application/json

{
  "prompt": "string"
}
```

Response:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "[\"#FF0000\", \"#00FF00\", \"#0000FF\", \"#FFFF00\", \"#FF00FF\"]"
          }
        ]
      }
    }
  ]
}
```

## Future Enhancements

- [ ] Color palette export in various formats (CSS, SCSS, etc.)
- [ ] Color accessibility checker
- [ ] Color combination suggestions
- [ ] Custom palette creation tools
- [ ] Social sharing features
- [ ] Color naming suggestions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for powering the color generation
- Material-UI for the beautiful components
- Firebase for backend services 