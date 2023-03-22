import { createSlice } from "@reduxjs/toolkit";

const products = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: "25",
    img: "https://images.unsplash.com/photo-1533041188636-8f2c32a22489",
    description: "This is a men's t-shirt",
  },
  {
    id: 2,
    name: "Women's T-Shirt",
    price: "20",
    img: "https://images.unsplash.com/photo-1559563458-4d4aedfa7cf1",
    description: "This is a women's t-shirt",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: "80",
    img: "https://images.unsplash.com/photo-1609287262366-8c6c78bf3d0b",
    description: "These are running shoes",
  },
  {
    id: 4,
    name: "Leather Bag",
    price: "120",
    img: "https://images.unsplash.com/photo-1576488716146-56c1dcbcfe88",
    description: "This is a leather bag",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: "30",
    img: "https://images.unsplash.com/photo-1585819267823-b769a05ccf3d",
    description: "These are sunglasses",
  },
  {
    id: 6,
    name: "Headphones",
    price: "50",
    img: "https://images.unsplash.com/photo-1611981923828-c2696d6601d7",
    description: "These are headphones",
  },
  {
    id: 7,
    name: "Smartphone",
    price: "800",
    img: "https://images.unsplash.com/photo-1568267949873-3c8e9fa3b424",
    description: "This is a smartphone",
  },
  {
    id: 8,
    name: "Watch",
    price: "200",
    img: "https://images.unsplash.com/photo-1520814513633-1d5869dd6494",
    description: "This is a watch",
  },
  {
    id: 9,
    name: "Camera",
    price: "500",
    img: "https://images.unsplash.com/photo-1543690364-dc409cd1e747",
    description: "This is a camera",
  },
  {
    id: 10,
    name: "Television",
    price: "1000",
    img: "https://images.unsplash.com/photo-1580498502223-9e9b72d0b798",
    description: "This is a television",
  },
  {
    id: 11,
    name: "Speaker",
    price: "150",
    img: "https://images.unsplash.com/photo-1622446985287-433ec5b5a5c5",
    description: "This is a speaker",
  },
  {
    id: 12,
    name: "Mouse",
    price: "20",
    img: "https://images.unsplash.com/photo-1594248975311-d16ba347b7d4",
    description: "This is a mouse",
  },
  {
    id: 13,
    name: "Keyboard",
    price: "30",
    img: "https://images.unsplash.com/photo-1551803091-16e4ca4a02e5",
    description: "This is a keyboard",
  },
  {
    id: 14,
    name: "Laptop",
    price: "1000",
    img: "https://images.unsplash.com/photo-1519661655787-fd579e84b6e4",
    description: "This is a laptop",
  },
  {
    id: 15,
    name: "Tablet",
    price: "500",
    img: "https://images.unsplash.com/photo-1611095878498-d59f72a3cf52",
    description: "This is a tablet",
  },
  {
    id: 16,
    name: "Gaming Console",
    price: "400",
    img: "https://images.unsplash.com/photo-1628149268818-05e62dab445d",
    description: "This is a gaming console",
  },
  {
    id: 17,
    name: "Desk Lamp",
    price: "40",
    img: "https://images.unsplash.com/photo-1623403090349-9ba6365e1f68",
    description: "This is a desk lamp",
  },
  {
    id: 18,
    name: "Power Bank",
    price: "50",
    img: "https://images.unsplash.com/photo-1545239521-5dcb8137b1ba",
    description: "This is a power bank",
  },
  {
    id: 19,
    name: "Backpack",
    price: "80",
    img: "https://images.unsplash.com/photo-1607578726749-9ed1e74692fc",
    description: "This is a backpack",
  },
];

const initialState = {
  products,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
});

export default productsSlice;
