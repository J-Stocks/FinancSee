# About FinancSee
FinancSee is a web application built by Joshua Stocks (u1757754) for the module Advanced Front-End Web Development (CHT2531) at the University of Huddersfield. FininacSee allows users to browse company profiles, stock prices and compare currency values using data provided by [Alpha Vantage](https://www.alphavantage.co/#about).

# Setup Instructions:
To set up and run FinancSee in a dev environment follow these steps:
- Download the project files, either from the command line: `git clone git@github.com:J-Stocks/FinancSee.git`, or by downloading them as a .zip archive.
- Install the project's [npm](https://nodejs.org/en/) dependencies: `npm install`.
- Create a local .env file using the env.example provided in this repo: `cp .env.example .env.local`.
- Add your Alpha Vantage API key to the "VUE_APP_ALPHA_VANTAGE_KEY" property in the new .env.local file. Free API keys are available from [Alpha Vantage's website](https://www.alphavantage.co/support/#api-key).

Your local copy of FinancSee is now ready to use, for this you have several options:
- Use the command `vue ui` to run and open the GUI provided by vue-cli, this utility provides an easy-to-use front end for the other build tasks listed below, as well as various useful build stats like dependency file sizes and build times.
- Use `npm run serve` to start a local webserver with hot-reloads to see any code changes you make in action.
- Use `npm run build` to compile and minify all code for deployment to production, these files will be placed in the `/dist/` directory of your project. Note that this does not start a webserver, to use the compiled files you will need to move them to your webserver or initialise one in the `./dist/` directory. 

# Tools
FinancSee was built using the following tools:
- [Vue.js](https://vuejs.org/)
  - [Vue CLI](https://cli.vuejs.org/)
  - [Vue Router](https://router.vuejs.org/)
  - [vue-chartjs](https://vue-chartjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [Day.js](https://day.js.org/)
- [Papa Parse](https://www.papaparse.com/)
