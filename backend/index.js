const app = require('./app/appSetup');
const routes = require('./routes');
const PORT = 3000;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});