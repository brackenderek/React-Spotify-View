# Artist Search SPA using React and Spotify API

This is a single page application (SPA) built using the Facebook React library and the Spotify API. Use the search bar to search for artists and display correlating information, such as top ten songs on Spotify, Album & track listings, as well as related artists. 

![Image of start screen](https://github.com/brackenderek/React-Spotify-View/blob/master/src/images/spotify1.png)
![Image of artist search](https://github.com/brackenderek/React-Spotify-View/blob/master/src/images/spotify2.png)
![Image of album track listing](https://github.com/brackenderek/React-Spotify-View/blob/master/src/images/spotify3.png)
## Getting Started

To see the app in action, clone this repository to a local directory on your machine, then from a Command Line, cd into the newly created directory.
Now run the install command to install all of the necessary dependencies

```bash
$ npm install
```
Once all dependencies have been installed, you can run the webpack dev server to see the app in action.
Run the webpack dev server by running the start command
```bash
$ npm start
```
Once the dev server is listening to requests, open a browser and navigate to the specified location (i.e. localhost:8000)

## Command Line scripts
The following commands are available:
```bash
# Start for development
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Auto-run unit tests on file changes
npm run test:watch

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy
```

