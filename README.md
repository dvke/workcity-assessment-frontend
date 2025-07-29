# WorkCity Project Management - Frontend

This is the frontend for the WorkCity Project Management application, built with React and Vite. It provides a responsive and user-friendly interface to interact with the backend API.

## Features

- **Responsive Design**: A clean and modern UI that works on all screen sizes, built with Tailwind CSS.
- **Component-Based Architecture**: Logically structured components for easy maintenance and scalability.
- **User Authentication**: Pages for user signup and login with token management in local storage.
- **Protected Routes**: Certain pages and features are only accessible to authenticated users.
- **Client Dashboard**: View, add, edit, and delete clients.
- **Project Dashboard**: View, add, edit, and delete projects.
- **Client Profile View**: A dedicated page to view a client's details and all their associated projects.
- **State Management**: Global authentication state is handled efficiently via React Context.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast and modern build tool for frontend development.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for making API calls.
- **Lucide React**: A library of beautiful and consistent icons.

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- The backend API must be running (see the backend README for instructions).

### Steps

1.  **Create the Vite project**:

    ```bash
    npm create vite@latest frontend -- --template react
    ```

2.  **Navigate into the project directory**:

    ```bash
    cd frontend
    ```

3.  **Install dependencies**:

    ```bash
    npm install axios jwt-decode lucide-react
    ```

4.  **Install and configure Tailwind CSS**:
    Follow the official guide for Vite: [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite). This involves installing dev dependencies and setting up `tailwind.config.js` and `postcss.config.js`.

5.  **Set up the code**:

    - Replace the content of `src/index.css` with the required Tailwind directives.
    - Replace the content of `src/App.jsx` with the code provided in the Canvas.
    - Update `src/main.jsx` to render the `App` component.

6.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

---

## Application Structure

The entire application is contained within `src/App.jsx` for simplicity, but it is structured logically into several parts:

1.  **API Service**: A pre-configured `axios` instance for all backend communication.
2.  **Auth Context**: A React Context provider that manages the user's authentication state globally.
3.  **Components**: Reusable UI elements like `Navbar` and `PrivateRoute`.
4.  **Pages**: Each view of the application (e.g., `HomePage`, `ClientDashboard`, `ProjectForm`) is a separate component.
5.  **App Router**: A simple, state-based router that manages which page is currently displayed.
