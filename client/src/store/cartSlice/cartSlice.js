import {
    createSlice
} from "@reduxjs/toolkit";
import {
    toast
} from 'react-toastify';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        carts: [
            {
                kitchen: "1",
                cartItems: [], // item: {name, img, totalPrice, price, quantity, originalProductQuantity, kitchen}
                cartTotalQuantity: 0,
                cartTotalPrice: 0,
                cartName: ''
            },
            {
                kitchen: "2",
                cartItems: [], // item: {name, img, totalPrice, price, quantity, originalProductQuantity, kitchen}
                cartTotalQuantity: 0,
                cartTotalPrice: 0,
                cartName: ''
            },
        ]
    },
    reducers: {
        addToCart(state, action) {
            const itemToBeAdded = action.payload;
            const kitchen = itemToBeAdded.kitchen;

            const existingItem = state.carts[kitchen === "1" ? 0 : 1].cartItems.find(cartItem => cartItem.id === itemToBeAdded.id);

            state.carts[+kitchen - 1].cartTotalQuantity++;
            state.carts[+kitchen - 1].cartTotalPrice += +itemToBeAdded.price;
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += +itemToBeAdded.price
            }
            else {
                state.carts[kitchen === "1" ? 0 : 1].cartItems.push({
                    description: itemToBeAdded.description,
                    id: itemToBeAdded.id,
                    name: itemToBeAdded.name,
                    img: itemToBeAdded.img,
                    price: itemToBeAdded.price,
                    quantity: 1,
                    totalPrice: itemToBeAdded.price,
                    kitchen,
                });
                toast.success(`${itemToBeAdded.name} Added To Cart`, {
                    position: 'bottom-left'
                })
            }
        },
        incrementProductQuantity(state, action) {
            const productIdToBeIncremented = action.payload.id;
            const kitchen = action.payload.kitchen;

            const existingItem = state.carts[kitchen - 1].cartItems.find(cartItem => cartItem.id === productIdToBeIncremented);

            state.carts[kitchen - 1].cartTotalQuantity++;
            state.carts[kitchen - 1].cartTotalPrice += +existingItem.price;
            existingItem.quantity++;
            existingItem.totalPrice += +existingItem.price;
        },
        decrementProductQuantity(state, action) {
            const productIdToBeDecremented = action.payload.id;
            const kitchen = action.payload.kitchen;

            const existingItem = state.carts[kitchen - 1].cartItems.find(cartItem => cartItem.id === productIdToBeDecremented);

            state.carts[kitchen - 1].cartTotalQuantity--;
            state.carts[kitchen - 1].cartTotalPrice -= +existingItem.price;

            // if there is only one item of product in cart
            if (existingItem.quantity <= 1) {
                state.carts[kitchen - 1].cartItems = state.carts[kitchen - 1].cartItems.filter(cartItem => cartItem.id !== productIdToBeDecremented);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= +existingItem.price;
            }
        },
        clearCart(state, action) {
            const kitchen = action.payload.kitchen;

            state.carts[kitchen === "1" ? 0 : 1].cartItems = [];
            state.carts[kitchen === "1" ? 0 : 1].cartTotalPrice = 0;
            state.carts[kitchen === "1" ? 0 : 1].cartTotalQuantity = 0;
            state.carts[kitchen === "1" ? 0 : 1].cartName = ''
        },
        nameCart(state, action) {
            const kitchen = action.payload.kitchen;
            state.carts[kitchen === "1" ? 0 : 1].cartName = action.payload.name;
        }
    }
})

const cartActions = cartSlice.actions;

export {
    cartActions
}

export default cartSlice;