require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const uri = `mongodb+srv://hamza:${process.env.DB_PASSWORD}@cluster1.ck9a9.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error(`❌ Could not connect to MongoDB:${process.env.DB_PASSWORD}`, err));

const cardSchema = new mongoose.Schema({
    creditCardNumber: { type: String, required: true },
    cardHolder: { type: String, required: true },
    expirationDate: { type: String, required: true },
    ccv: { type: String, required: true },
  });

const CardInfo = mongoose.model('CardInfo', cardSchema);

app.use(express.static(path.join(__dirname, '../dist/your-angular-project')));

app.post('/api/card-info', async (req, res) => {
  try {
    const { creditCardNumber, cardHolder, expirationDate, ccv } = req.body;

    // Saving the card info into db
    const card = new CardInfo({
      creditCardNumber,
      cardHolder,
      expirationDate,
      ccv,
    });

    await card.save();
    res.status(201).send({ message: 'Card info saved successfully!' });
  } catch (error) {
    console.error('Error saving card info:', error);
    res.status(500).send({ error: 'Failed to save card info' });
  }
});

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/your-angular-project/index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
