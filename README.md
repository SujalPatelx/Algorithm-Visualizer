# Algorithm Visualizer

An interactive web application built with React and Vite that helps users understand how different sorting algorithms work through step-by-step visualizations.

## Features

- Interactive visualization of popular sorting algorithms:
  - Bubble Sort
  - Quick Sort
  - Merge Sort
- Step-by-step execution control
- Adjustable animation speed
- Configurable array size
- Real-time code highlighting
- Responsive design

## Technologies Used

- React 18
- Vite
- Styled Components
- React Router DOM
- ESLint

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Previews the production build locally

## Features in Detail

### Sorting Algorithms

1. **Bubble Sort**
   - Time Complexity: O(n²)
   - Space Complexity: O(1)
   - Simple comparison-based sorting algorithm

2. **Quick Sort**
   - Time Complexity: O(n log n)
   - Space Complexity: O(log n)
   - Efficient divide-and-conquer algorithm

3. **Merge Sort**
   - Time Complexity: O(n log n)
   - Space Complexity: O(n)
   - Stable divide-and-conquer algorithm

### Visualization Controls

- Generate new random arrays
- Control animation speed
- Step forward/backward through the sorting process
- Pause/Resume functionality
- Array size adjustment

## Project Structure

```
algorithm-visualizer/
├── src/
│   ├── algorithms/     # Sorting algorithm components
│   ├── components/     # Reusable UI components
│   ├── utils/         # Utility functions
│   ├── pages/         # Page components
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template

```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various algorithm visualization tools
- Built with React and modern web technologies
- Uses styled-components for styling