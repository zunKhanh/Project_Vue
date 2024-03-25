const express = require('express');
const app = express();
const port = 3000;

// Giả sử dữ liệu của bạn nằm trong một tệp JSON như sau
const data = require('./data/db.json');

app.get('/sanpham', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
