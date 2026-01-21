# Bin2Dec-Dec2Bin - Vanilla TypeScript Architecture Study

![Bin2Dec Cover](public/product-b2d-d2b.png)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A bidirectional binary-to-decimal converter application designed as a study in software architecture using **Vanilla TypeScript**.

## Motivation & Philosophy

The primary goal of this project is to explore software architecture principles—specifically **Component-Based Architecture** and **State Management patterns**—without the abstraction layers provided by modern frameworks like React, Vue, or Angular.

By using **pure TypeScript**, **HTML5**, and **CSS3**, this project demonstrates how to structure a scalable, maintainable application from scratch. It forces a deeper understanding of:

- **DOM Manipulation**: Direct interaction without a Virtual DOM.
- **State Management**: Implementing the Observer Pattern manually to manage application state.
- **Event Handling**: Managing native event listeners and cleanup cycles.

## Technical Architecture

The application follows a **modular, component-based structure** with a clear separation of concerns, imitating the structure of modern frameworks but implemented with native technologies.

### 1. Component Encapsulation

The application adopts a strict component-based architecture where the UI is composed of self-contained classes. Each component is responsible for:

- Managing its own DOM elements and local state.
- Handling user interactions within its scope.
- Subscribing to global state changes relevant to its function.

This approach mimics the encapsulation found in modern frameworks (React, Vue), demonstrating how to build isolated, reusable UI units using standard Web APIs.

### 2. State Management (Observer Pattern)

A centralized **State Service** acts as the "Single Source of Truth," implementing the Observer Pattern manually.

- **Decoupling**: Components do not communicate directly. Instead, they subscribe to specific state changes (e.g., input updates, mode switches).
- **Reactivity**: When the state updates, the service notifies only the relevant subscribers, ensuring the UI stays in sync with the data without tight coupling between components.

### 3. Separation of Concerns & Service Layer

The architecture strictly separates presentation from business logic.

- **Services**: Handle all complex calculations and data transformations.
- **UI Components**: Remain "dumb," focused solely on rendering and user interaction, delegating logic to services.

## Project Structure

```
src/
├── core/           # distinct application entry point (App class)
├── scripts/
│   ├── components/ # UI Classes (Header, Input, Output, Steps)
│   ├── services/   # Business logic and State management
│   ├── types/      # TypeScript interfaces and type definitions
│   └── utils/      # Helper functions
├── styles/         # CSS using BEM naming convention and CSS Variables
└── ...
```

## Technology Stack

- **Language**: TypeScript (Strict mode enabled)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Responsive Design)
- **Build Tool**: Vite
- **Quality Control**: ESLint, Prettier, Husky, Commitlint

## Running the Project

1. **Installation**

   ```bash
   npm install
   ```

2. **Development**

   ```bash
   npm run dev
   ```

3. **Production Build**
   ```bash
   npm run build
   ```
