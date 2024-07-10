# Tech Radar

Tech Radar is a visual tool for tracking technology trends and organizing technologies into a radar-like visualization. This project allows users to view and interact with a technology radar, displaying various technologies across different quadrants and adoption rings.

## Features

- Interactive SVG-based radar visualization
- Hover tooltips for detailed technology information
- Responsive design for various screen sizes
- Quadrant and ring categorization
- Status indicators for new, moved, and unchanged technologies

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tech-radar.git
   cd tech-radar
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to view the application.

## Usage

- Hover over technology points on the radar to view detailed information.
- Click on quadrant labels to filter technologies (functionality to be implemented).
- Use the status legend to understand the meaning of different technology indicators.

## Building for Production

To create a production build, run:

```
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is set up to deploy to GitHub Pages. To deploy:

1. Ensure your repository is configured for GitHub Pages in the Settings.
2. Run the deploy script:
   ```
   npm run deploy
   ```

This will build the project and push it to the `gh-pages` branch of your repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was bootstrapped with Vite.
- UI components are from Material-UI (MUI).

## Future Plans

- Integration with Firestore for real-time data storage and synchronization.
- Implement filtering and sorting functionalities.
- Add user authentication for personalized radars.

## Contact

If you have any questions or feedback, please open an issue in the GitHub repository.
