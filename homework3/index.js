const http = require('http');
const url = require('url');

const getForm = () => `
  <form
    method="GET"
    action="/search"
  >
  <div class="d-flex align-items-center">
    <input
      name="city" 
      type="text"
      class="mr-1"
    />
    <button
      class="btn btn-sm btn-outline-success" 
      type="submit"
    >
      Submit
    </button>
  </div>
  </form>
`;

const weatherInfoLayout = (fullInfo) => {
  console.log(fullInfo);

  const where = `
  <div class="card mr-1" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Location: </h5>
      <p class="card-text">City: ${fullInfo.location.name}</p>
      <p class="card-text">Country: ${fullInfo.location.country}</p>
      <p class="card-text">Region: ${fullInfo.location.region}</p>
    </div>
  </div>
  `;

  const weather = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Weather: </h5>
      <p class="card-text">Feels like: ${fullInfo.current.feelslike}&#8451;</p>
      <p class="card-text">Visibility: ${fullInfo.current.visibility}km</p>
      <p class="card-text">Coudcover: ${fullInfo.current.cloudcover}%</p>
    </div>
  </div>`;

  const layout = `
    <div class="d-flex align-items-center">
      ${where}
      ${weather}
    </div>
  `;

  console.log('layout', layout);

  return layout;
};

const layoutStart = `
  <link
    rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" 
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
    crossorigin="anonymous"
  />
    <div class="container pt-5">
`;

const layoutEnd = `</div>`;

const server = http.createServer((req, res) => {
  const urlParsed = url.parse(req.url, true);
  const { pathname, query } = urlParsed;
  const { method } = req;

  res.setHeader('Content-Type', 'text/html; charset=utf-8;');

  if (pathname === '/' || pathname === '/index') {
    res.write(layoutStart);
    res.write(`<h2>Welcome to weather check!</h2>`);
    res.write(`<h3>Write down city name: </h3>`);
    res.write(getForm());
    res.write(layoutEnd);
  } else if (pathname === '/search') {
    if (method === 'GET') {
      res.write(layoutStart);
      res.write(`<h2>Search for a new city: </h2>`);
      res.write(getForm());
      res.write(`<h2>Weather report: </h2>`);
      fetch(
        `http://api.weatherstack.com/current?access_key=d511ea545c832fa27f0ebf26c1455e36&query=${query.city}`
      )
        .then((response) => response.json())
        .then((data) => {
          res.write(weatherInfoLayout(data));
          res.write(layoutEnd);
        })
        .catch((e) => {
          res.write('<p>Something went wrong</p>');
          res.write(layoutEnd);
        })
        .finally(() => {
          res.end();
        });
    }
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log('Server is listening on port ' + PORT);
