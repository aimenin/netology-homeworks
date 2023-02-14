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
      Запросить
    </button>
  </div>
  </form>
`;

const weatherInfoLayout = (fullInfo) => {
  console.log(fullInfo);

  const where = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Location: </h5>
      <p class="card-text">${fullInfo.location.name}</p>
      <p class="card-text">${fullInfo.location.country}</p>
      <p class="card-text">${fullInfo.location.region}</p>
    </div>
  </div>
  `;

  const weather = `
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Weather: </h5>
      <p class="card-text">${fullInfo.current.feelslike}</p>
      <p class="card-text">${fullInfo.current.visibility}</p>
      <p class="card-text">${fullInfo.current.cloudcover}</p>
    </div>
  </div>`;

  const layout = `
    <div>
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
    res.write(`<h2>Добро пожаловать на сайт прогноза погоды!</h2>`);
    res.write(getForm());
    res.write(layoutEnd);
  } else if (pathname === '/search') {
    if (method === 'GET') {
      res.write(layoutStart);
      res.write(`<h2>Прогноз погоды для города:</h2>`);
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
