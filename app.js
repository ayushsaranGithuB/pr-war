// Import the express framework
express = require("express");
// setup apicache
const apicache = require("apicache");
let cache = apicache.middleware;

// higher-order function returns false for responses of other status codes (e.g. 403, 404, 500, etc)
const onlyStatus200 = (req, res) => res.statusCode === 200;

const cacheSuccesses = cache("90 minutes", onlyStatus200);

// Fetch Environment Variables
require("dotenv").config();

// tell node that we are creating an express app
const app = express();

// define the port that the server will run on
const port = 3000;

// Serve static files from the public directory
app.use(express.static("public"));

// use ejs as the view engine
app.set("view engine", "ejs");

// define the route for the index page
app.get("/", (req, res) => {
  res.render("home");
});

// define the route for the about page
app.get("/about", (req, res) => {
  res.render("about");
});

// define the route for the /search endpoint
app.get("/battle", (req, res) => {
  // Get the query parameter from the request
  const query = req.query;
  const topic_a = query.topic_a;
  const topic_b = query.topic_b;
  res.render("results", { topic_a, topic_b });
});

// define the route for the /api/search endpoint
app.get("/api/search/:query", cacheSuccesses, async (req, res) => {
  // make the call to the SearchTopic function and pass in the query parameter
  let query = req.params.query;

  // console.log(query);

  // Set Date range in seconds since the epoch, for the search to the last 3 months
  let datefrom = Math.floor(Date.now() / 1000) - 7776000;
  let dateto = Math.floor(Date.now() / 1000);

  const API_KEY = process.env.FEEDRIKA_API_KEY;
  const url = `https://api.feedrika.com/?apiKey=${API_KEY}&q=${query}&from=${datefrom}&to=${dateto}`;
  // console.log(url);
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  res.send(result);
});

// Start the server and tell the app to listen for incoming connections on the port specified
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
