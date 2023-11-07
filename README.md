# Introduction to Monorepo Example Repository

> :wave: **Welcome to my Monorepo Boilerplate repository.**
>
> This project is structured as a monorepo and is managed with [Nx](https://nx.dev/), a powerful tool for monorepo development, which helps orchestrate and optimize the build process among other tasks.
>
> The backend is built with [NestJS](https://nestjs.com/), featuring many standard implementations ready to go out of the box. Read below for more details.

## Table of Contents

- [Getting Started](#getting-started)
- [Backend Structure](#backend-structure)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)

## Getting Started

To get the backend up and running in a development environment, follow these steps:

1. **Clone the repository**:
   Use the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/DeanRTaylor1/monorepo-example
   ```

2. **Install dependencies**:
   Navigate to the project directory and use Yarn to install the necessary dependencies:

   ```bash
   cd <repository-directory>
   yarn
   ```

3. **Run the Application**:
   You can now start the application with the following command (utilizes Docker):
   ```bash
   yarn dev:docker
   ```
   This command (`dev:be`) is shorthand for `docker-compose up`, as defined in the `scripts` section of `package.json`, which sets up the database and server containers. More applications can be added to the docker-compose.yml

## Backend Structure

The backend is structured with an emphasis on modular organization aligned with my personal preference for NestJs. The root of the project contains the `app` directory, which holds global logic and forms the base of our Nest project.

Utility decorators such as [@BodyToCamel](apps/backend/src/app/decorators/body-to-camel.decorator.ts) and [@SnakeInterceptor](apps/backend/src/app/interceptors/snakecase.interceptor.ts) are integrated for handling case conversion of DTOs between snake case and camelCase. Types are shared in the `common` [Case Utils](common/src/lib/utils/case.util.ts) directory to minimize repetition across backend and frontend.

Sensitive information is safeguarded by the `responses` interceptor, which automatically excludes specified fields from client exposure. These sanitized types are also declared in the `common` [Sanitize Types](common/src/lib/utils/tainted.util.ts) package for frontend usage.

Configurations, including environment variables, are managed through an [env object](apps/backend/src/app/modules/config/env.ts), which is set up to read from `.env.NODE_ENV.local` files. Sequelize is the chosen ORM, but you can swap it out for TypeORM if preferred.

Role-based authentication with JWT is implemented, with route-level control using decorators and guards, by default all routes have basic auth and you need to disable auth with the @Public() decorator, to set up role authentication you can apply the @Roles and @UseGuard decorators which is explained on the nestjs docs. Refer to the [UsersController](apps/backend/src/app/modules/users/users.controller.ts) for an example of setup.

Further project details and instructions on extending functionality with Nx are available in the [Nx documentation](https://nx.dev/).

## Directory Structure

Below is the directory structure of the backend, illustrating the organization and location of important files:

```
.
├── databases
│   ├── config
│   │   └── config.js
│   ├── migrations
│   │   └── 20231031032120-create-users.ts
│   └── models
│       └── index.js
├── jest.config.ts
├── project.json
├── sequelize.js
├── src
│   ├── app
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.spec.ts
│   │   ├── app.service.ts
│   │   ├── decorators
│   │   │   ├── body-to-camel.decorator.ts
│   │   │   ├── pagination.decorator.ts
│   │   │   ├── public-route.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── filters
│   │   │   ├── all-exceptions.filter.spec.ts
│   │   │   └── all-exceptions.filter.ts
│   │   ├── guards
│   │   │   ├── auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── interceptors
│   │   │   ├── responses.interceptor.spec.ts
│   │   │   ├── responses.interceptor.ts
│   │   │   ├── route-logger.interceptor.spec.ts
│   │   │   ├── route-logger.interceptor.ts
│   │   │   ├── snakecase.interceptor.spec.ts
│   │   │   └── snakecase.interceptor.ts
│   │   ├── modules
│   │   │   ├── [auth](apps/backend/src/app/modules/auth)
│   │   │   ├── [base](apps/backend/src/app/modules/base)
│   │   │   ├── [config](apps/backend/src/app/modules/config)
│   │   │   └── [users](apps/backend/src/app/modules/users)
│   │   └── pipes
│   │       ├── compare-password.pipe.ts
│   │       └── hash-password.pipe.ts
│   ├── assets
│   ├── main.ts
│   └── utils
│       ├── encryption.ts
│       └── format.utils.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── webpack.config.js
```

```

```
