const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'src');

app.use(express.static(ROOT));

// Fallback: serve index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Quantum Florida Management running on port ${PORT}`);
});
