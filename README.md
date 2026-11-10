# RESTy — API Testing Application

## Code 401 — Lab 26: Component Based UI

### Overview

RESTy is a React application designed to provide a user interface for testing REST API requests.

This project is the first phase of a four-phase application build.

In Lab 26, the primary objective is to establish the application's component structure and refactor the starter code from React class components into functional components.

### Technologies Used

- React
- Vite
- JavaScript / JSX
- Sass (SCSS)
- UUID
- Oxlint
- Git and GitHub

### Component Structure

- **App.jsx:** Main application container. Remains a class component and manages application state.
- **Header:** Functional component displaying the application heading.
- **Footer:** Functional component displaying the footer.
- **Form:** Functional component containing the API request form and submitting data to App through props.
- **Results:** Functional component displaying formatted mock API results.

Each component has its own SCSS stylesheet.

### Current Functionality — Phase 1

- Displays a RESTy application interface.
- Provides a URL input field and HTTP method labels.
- Handles form submission using a callback passed through props.
- Updates application state with request information.
- Displays mock API response data as formatted JSON.

**Note:** Phase 1 uses mock data. Live API requests and fully interactive HTTP method selection are planned for later phases.

### Installation

Clone the repository:

```bash
git clone git@github.com:metswin17/resty.git
```

Navigate into the project:

```bash
cd resty
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

### Testing and Verification

The application was manually tested in the browser to verify that:

- Components render successfully.
- The GO! button submits request information.
- App updates its state.
- Results displays formatted mock JSON.

Oxlint validation:

```bash
npx oxlint src
```

### Development Branches

- `main` — Initial project branch
- `base` — Lab 26 development branch

### Author

GitHub: [metswin17](https://github.com/metswin17)

### UML Diagram

A component UML diagram documenting the relationships between App, Header, Form, Results, and Footer will be included with the Lab 26 submission.
