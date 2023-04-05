import { createSlice } from "@reduxjs/toolkit";
import {
  toast
} from 'react-toastify';

const products = [
  {
    id: 1,
    name: "Men's T-Shirt",
    price: "25",
    img: "https://images.unsplash.com/photo-1533041188636-8f2c32a22489",
    description: "This is a men's t-shirt",
    quantity: 10,
  },
  {
    id: 2,
    name: "Women's T-Shirt",
    price: "20",
    img: "https://images.unsplash.com/photo-1559563458-4d4aedfa7cf1",
    description: "This is a women's t-shirt",
    quantity: 10,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: "80",
    img: "https://images.unsplash.com/photo-1609287262366-8c6c78bf3d0b",
    description: "These are running shoes",
    quantity: 10,
  },
  {
    id: 4,
    name: "Leather Bag",
    price: "120",
    img: "https://images.unsplash.com/photo-1576488716146-56c1dcbcfe88",
    description: "This is a leather bag",
    quantity: 10,
  },
  {
    id: 5,
    name: "Sunglasses",
    price: "30",
    img: "https://images.unsplash.com/photo-1585819267823-b769a05ccf3d",
    description: "These are sunglasses",
    quantity: 10,
  },
  {
    id: 6,
    name: "Headphones",
    price: "50",
    img: "https://images.unsplash.com/photo-1611981923828-c2696d6601d7",
    description: "These are headphones",
    quantity: 10,
  },
  {
    id: 7,
    name: "Smartphone",
    price: "800",
    img: "https://images.unsplash.com/photo-1568267949873-3c8e9fa3b424",
    description: "This is a smartphone",
    quantity: 10,
  },
  {
    id: 8,
    name: "Watch",
    price: "200",
    img: "https://images.unsplash.com/photo-1520814513633-1d5869dd6494",
    description: "This is a watch",
    quantity: 10,
  },
  {
    id: 9,
    name: "Camera",
    price: "500",
    img: "https://images.unsplash.com/photo-1543690364-dc409cd1e747",
    description: "This is a camera",
    quantity: 10,
  },
  {
    id: 10,
    name: "Television",
    price: "1000",
    img: "https://images.unsplash.com/photo-1580498502223-9e9b72d0b798",
    description: "This is a television",
    quantity: 10,
  },
  {
    id: 11,
    name: "Speaker",
    price: "150",
    img: "https://images.unsplash.com/photo-1622446985287-433ec5b5a5c5",
    description: "This is a speaker",
    quantity: 10,
  },
];

const initialState = {
  products,
  totalStocks: 110
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    decrementProduct(state, action) {
      const productQuantityToBeUpdated = state.products.find(product => product.id === action.payload);
      if (productQuantityToBeUpdated.quantity > 0) {
        productQuantityToBeUpdated.quantity--;
        if (productQuantityToBeUpdated.quantity < 5) {
          toast.warn(`${productQuantityToBeUpdated.name}'s stocks are low Items remaining: ${productQuantityToBeUpdated.quantity}`, {
            position: 'bottom-left'
          })
        }
      }
    },
    checkProductStocks(state, action) {
      
    }
  }
});

const productsActions = productsSlice.actions;

export {
  productsActions
}

export default productsSlice;
