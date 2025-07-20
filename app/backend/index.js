const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const restaurants = [
  {
    id: 1,
    name: "Papa's Pizza",
    cuisine: "pizza",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Burger Queen",
    cuisine: "burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    rating: 4.0,
  },
  {
    id: 3,
    name: "Sweet Treats",
    cuisine: "dessert",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Sushi Central",
    cuisine: "sushi",
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb43?auto=format&fit=crop&w=600&q=80",
    rating: 4.3,
  },
  {
    id: 5,
    name: "Cheesy Delight",
    cuisine: "pizza",
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&w=600&q=80",
    rating: 4.1,
  },
];

app.get('/', (req, res) => {
  res.send('Welcome to Tomato Backend API!');
});

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.listen(PORT, () => {
  console.log(`Tomato API running on http://localhost:${PORT}`);
});
