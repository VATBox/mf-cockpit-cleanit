import express from 'express';
import path from 'path';
import compression from 'compression';
import hsts from 'hsts';

const basePath = path.join(__dirname, '/../dist');
// PORT
const port = process.env.PORT || 4201;

const app = express();

app.use((req: any, res: any, next: any) => {
  // TODO: Add here env variables for staging
  if (!process.env.PORT) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
  }
  next();
});

app.use(compression());
app.use(express.json());

app.use(
  hsts({
    maxAge: 15552000, // 180 days in seconds
  })
);

// Point static path to dist
app.use(express.static(basePath));

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
