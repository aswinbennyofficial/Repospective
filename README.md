# Repospective
Repospective is a project aimed at providing valuable insights and tools for GitHub repositories. Whether you're an individual developer, a team, or an organization, Repospective offers a range of features to enhance your GitHub experience.

## Features

- Repo Analytics: Gain insights into your repository's performance, contributors, and more.
- Better Forks: Explore the most forked repositories on GitHub.
- GitHub Actions Config Generator: Easily generate configuration files for GitHub Actions workflows.

## Run the project
- Install dependencies `npm install`
- Rename `.env.example` to `.env` and fill the required information
- Run the server `npm start` 
- Frontend will load in `http://localhost:3000/`


----
----

## Webpages

### Homepage
- **URL:** /
- **Description:** Landing page for Repospective project.

### Repo Analytics
- **URL:** /pages/analytics.html
- **Description:** Provides detailed analytics for a GitHub repository.
- **API Endpoints Used:**
    - `GET /api/v1/repo/:username/:repo`
    - `GET /api/v1/repo/:username/:repo/graph`

### Better Forks
- **URL:** /pages/forks.html
- **Description:** Displays popular forks of a GitHub repository.
- **API Endpoint Used:**
    - `GET /api/v1/forks/:username/:repo`

### GitHub Actions Config Generator
- **URL:** /pages/config-gen.html
- **Description:** Generates custom configurations for GitHub Actions.
- **API Endpoint Used:**
    - `POST /api/v1/ga-config`

### About
- **URL:** /pages/about.html
- **Description:** Provides information about the Repospective project, including its uses and benefits.

### Contact Us
- **URL:** /pages/contact.html
- **Description:** Allows users to send emails to the project owner.
- **API Endpoint Used:**
    - `POST /api/v1/email`

## API Endpoints

### Health Check
- **Endpoint:** `GET /api/v1/healthcheck`
- **Description:** Endpoint to check the health of the API.
- **Method:** GET

### Get List of Forks
- **Endpoint:** `GET /api/v1/forks/:username/:repo`
- **Description:** Retrieves a list of forks for a GitHub repository.
- **Path parameters:**
    - `username`: GitHub username
    - `repo`: Repository name
- **Method:** GET

### Fetch Repo Details
- **Endpoint:** `GET /api/v1/repo/:username/:repo`
- **Description:** Fetches details of a GitHub repository.
- **Path parameters:**
    - `username`: GitHub username
    - `repo`: Repository name
- **Method:** GET

### Fetch Graph Activity
- **Endpoint:** `GET /api/v1/repo/:username/:repo/graph`
- **Description:** Fetches graph activity of a GitHub repository.
- **Path parameters:**
    - `username`: GitHub username
    - `repo`: Repository name
- **Method:** GET

### Generate GitHub Actions Config
- **Endpoint:** `POST /api/v1/ga-config`
- **Description:** Generates GitHub Actions configuration.
- **Body Parameters:**
    - `branchName`: Branch name
    - `language`: Programming language
    - `requireTests`: Whether tests are required
    - `registryUrl`: URL of registry
    - `username`: GitHub username
    - `imageName`: Name of the image
- **Method:** POST

### Send Email
- **Endpoint:** `POST /api/v1/email`
- **Description:** Sends an email to the project owner.
- **Body Parameters:**
    - `emailID`: Sender's email address
    - `emailSubject`: Subject of the email
    - `emailBody`: Body/content of the email
- **Method:** POST
