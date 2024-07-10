# Functional UI Tests for Kurtosys

This project contains automated UI tests for the Kurtosys website using Selenium WebDriver with JavaScript. The tests navigate through the website, dismiss the consent overlay, and click on specific links while taking screenshots of each significant step.

## Table of Contents

- [Prerequisites]
- [Setup]
- [Running the Tests]
- [Project Structure]
- [Screenshots]
- [Contributing]
- [License]

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (version 12 or later)
- [Google Chrome](https://www.google.com/chrome/)

## Setup

1. Clone the repository or download the project files.

    ```sh
    git clone https://github.com/yourusername/functional-ui-tests-kurtosys.git
    cd functional-ui-tests-kurtosys
    ```

2. Install the necessary dependencies.

    ```sh
    npm install selenium-webdriver
    ```

## Running the Tests

1. Ensure you are in the project directory.

    ```sh
    cd functional-ui-tests-kurtosys
    ```

2. Run the test script.

    ```sh
    node test.js
    ```

The script will open a Chrome browser, navigate to the Kurtosys website, dismiss the consent overlay, and click on specific links while taking screenshots of each significant step.

## Project Structure
