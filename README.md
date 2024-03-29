# SHFT Job Finder

## Requirements

Node.js version 18.18.0 and above and Yarn version 1.0 and above should be used.

## Installation

After cloning the project, follow the steps below:

1. Run the following command in the terminal to install the required packages:

   ```bash
   yarn install
   ```

2. Run the following command to prepare Husky:

   ```bash
   yarn prepare
   ```

## Running the Project

After completing the project setup, you can run the project with the following command:

```bash
yarn dev
```

## Commit Management

In this project, commits are managed using Commitizen and Commitlint commit standards. Therefore, when making a commit, you should use the following command instead of `git commit`:

```bash
yarn dev
```

## Important Note for Testing Mobile View on Desktop

This project implements server-side rendering (SSR) with mobile detection. Therefore, if you switch to the mobile view on your desktop browser for testing purposes, please make sure to reload the page and select a mobile device from the inspector to ensure the mobile layout renders correctly.
