# Draftbash

[![Build Status](https://img.shields.io/github/workflow/status/Draft-Bash/draftbash-server/CI)](https://github.com/Draft-Bash/draftbash-server/actions)
**All Rights Reserved**

This project is not open-source, and all rights are reserved by the author. Unauthorized use, reproduction, or distribution is strictly prohibited.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Testing](#testing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

## Installation
To run this backend, you need to have Docker and Docker Desktop installed. You will also need a bash terminal. You may need to install psql to query the database with the CLI. We recommend using Linux, MacOS, or Windows with a WSL terminal.

## Usage
To start the project, it is as simple as executing `docker-compose up` in your terminal.
All the dependencies, including a Postgres database, and environment variables for development are handled by the `docker-compose` file.
To see the API running, you can visit the `localhost:3000` port in your browser. We use Nodemon so that the running application
hot-reloads every time a change is made while the container is running. To ensure a consistent environment for all
developers, it is essential that you run the application with `docker-compose up`. The `docker-compose` file is for developers.
Because you will frequently interact with the database, you will want to be able to interact with the development database through the CLI.
To do this, once the containers are spun up with docker-compose, you can open up a new terminal and run the following command.
```bash
docker exec -it draftbash-server-postgres-1 psql -U postgres -d draftbash
```
You may need to have psql installed on your machine. Once the command is run, you will be able to interact with the database. Run `\dt`
to see all the tables in the database.

## Configuration
All development variables are hard-coded in the `docker-compose.yml` file. To access the development variables in the node.js application,
we used the dotenv library. If you need to add new environment variables, it is okay to hardcode them for the development environment as long 
as their values are not similar to the production values. For production, all environment variables are created in the Github actions workflow 
file by inserting secrets from Github into a `.env` file just before it containerizes and deploys the application for production.

## Contributing
Because this is not an open-source project, cloning the repository and pushing to it are not as straightforward as just cloning the repository through https.
To become a contributor, visit the "Contact" section and let me know if you would like to be a contributor. Texting is the best way to reach me.

As a contributor, you are expected to follow test-driven development and domain-driven development. You should follow the design and architectural patterns
as described in the docs folder. In particular, we are following a Clean Architectural style. There are many articles and tutorials explaining Clean Architecture.
Clean Architecture is similar to the Onion, Hexagonal, and Ports-and-Adapters architectures. The main idea is to have our business logic to use its dependencies by
having them inserted with dependency injection. This tutorial explains Clean Architecture with concrete examples: [Clean Architecture Tutorial](https://www.youtube.com/watch?v=VmY22KuRDbk&t=1044s)

To learn the design patterns and the concrete architectural examples being implemented in this project, we recommend reading the documentation in the docs folder. One of the best ways to understand what different parts of the source code are doing is to look at the unit tests as they clearly describe the desired behavior of most of the classes and functions.

As a contributor, you are expected to create your own feature branches. Once they are ready to merge into main, you will need to create a pull request, pass test cases, and ultimately get approved by me. The primary maintainer of the project has ultimately decides what is merged into main.

To clone the repository and make pushes to branches, you will need to create SSH tokens for yourself once you are
invited to the Github Organization. To do this, follow the following steps:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# Use this command to view the key. Copy it.
cat ~/.ssh/id_rsa.pub 
```

Go to your GitHub account settings.
Navigate to "SSH and GPG keys."
Click on "New SSH key" or "Add SSH key."
Paste the copied SSH key into the provided textarea.

Now, you can clone the repository with this: git@github.com:Draft-Bash/draftbash-server.git

You may be prompted to provide your username and password. For the password, go to your Github account settings, then developer settings, and then generate
a personal access token for yourself. Copy and paste it and provide that as your password. Go to the new directory through your terminal and run git remote -v
to make sure the repository is available for pushing and fetching from.

I recommend creating a draftbash folder to clone the repository into. For the other repositories, such as the client repositories, I would recommend cloning them into
your draftbash folder as well so that you can quickly access the frontend and backend code.

## Testing
To test the code for this application, we are utilizing a popular testing library called Jest.

To ensure clean, reliable, modular code, we are utilizing test-driven development. This means that before you use code in the src file, you must first create
a unit test in the tests folder. There are unit and integration test folders in the tests folder. The structure of these folders should resemble the folder structures
within the src folder. 

When designing a unit test, it is important to first assert what it must do. Because you are starting out with just assertions and nothing to execute them,
the first test should fail. Then, after writing this failing case, create something (usually a class or function) to pass the test. Then, refactor as needed and create more assertions
as needed. 

To maintain clean code, it is important for classes or functions to have their dependencies passed into them through dependency injection to ensure dependency inversion. This
helps assure a separation of concerns. For example, if you need an emailer dependency, you always inject a new one during the instantiation of a class as long as it follows the interface the class requires. By simply injecting that emailer dependency, none of the business logic within the class needed to be modified.
For the unit tests, you can pass mock dependencies so that the cases pass.

Although unit tests are helpful, the most important ones are integration tests as they integrate several areas of your code together and utilize real dependencies,
such as an HTTP request handler and database.

Before submitting a pull request, we recommend running all the tests, though they will be run automatically for each pull request to main and deployment to production.

## Acknowledgements
I would like to express my gratitude to the following individuals and libraries who have contributed to or inspired this project:

- [Brian Feddes](https://github.com/bfeddes): For starting this project with me.
- [Prisma](https://github.com/prisma): For providing a powerful and essential database schema and migrations manager
- [Eric Pogue](https://github.com/EricJPogue): For being my instructor in his software engineering and capstone classes
- [Express](https://github.com/expressjs/express): For providing a fast, unopinionated, minimalist web framework for Node.js
- [Jest](https://github.com/jestjs/jest): For providing a robust library for testing

## People
- The original author of draftbash is Stephen Feddes (main email: stephenpfeddes@gmail.com. Student email: stephenpfeddes@lewisu.edu. Phone number: +1-708-964-5875)
- The current lead maintainer is Stephen Feddes (main email: stephenpfeddes@gmail.com. Student email: stephenpfeddes@lewisu.edu.)
