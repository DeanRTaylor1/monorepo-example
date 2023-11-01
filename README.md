# Introduction to Monorepo Example Repository

Welcome to the Monorepo Example repository. This project is structured as a monorepo and is managed with Nx, a powerful tool for monorepo development, which helps orchestrate and optimize the build process among other tasks. The backend is built with NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications.

The `package.json` file script section is used to manage various development tasks like serving the backend, managing the PostgreSQL Docker container, and orchestrating database migrations with Sequelize.

## Getting Started

Follow these steps to run the backend in a development environment:

1. **Clone the repository**:
   First, clone the repository to your local machine using the following command:

   ```bash
   git clone <https://github.com/DeanRTaylor1/monorepo-example>
   ```

2. **Install dependencies**:
   Navigate to the project directory and install the necessary dependencies using Yarn:

   ```bash
   cd <repository-directory>
   yarn
   ```

3. **Run the backend**:
   Now, you can run the backend using the following command:
   ```bash
   yarn dev:be
   ```

This command (`dev:be`) is a shorthand for `nx run backend:serve` as defined in the `scripts` section of `package.json`, which triggers the Nx serve process for the backend application. The server will listen on port 3000 and swagger can be found at /api/docs
