import {
    createSlice
} from "@reduxjs/toolkit";
import {
    toast
} from 'react-toastify';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [], // item: {name, img, totalPrice, price, quantity, originalProductQuantity}
        cartTotalQuantity: 0,
        cartTotalPrice: 0,
        cartName: ''
    },
    reducers: {
        addToCart(state, action) {
            const itemToBeAdded = action.payload;
            
            const existingItem = state.cartItems.find(cartItem => cartItem.id === itemToBeAdded.id);

            if(existingItem && existingItem.quantity === existingItem.originalProductQuantity) {
                toast.error(`${itemToBeAdded.name} has no items left`, {
                    position: 'bottom-left'
                })
            }
            else {
                state.cartTotalQuantity++;
                state.cartTotalPrice += +itemToBeAdded.price;
                if (existingItem) {
                    existingItem.quantity++;
                    existingItem.totalPrice += +itemToBeAdded.price
                    toast.success(`${itemToBeAdded.name} quantity increased in cart to ${existingItem.quantity}!`, {
                        position: 'bottom-left'
                    })
                }
                else {
                    state.cartItems.push({
                        description: itemToBeAdded.description,
                        id: itemToBeAdded.id,
                        name: itemToBeAdded.name,
                        img: itemToBeAdded.img,
                        price: itemToBeAdded.price,
                        quantity: 1,
                        totalPrice: itemToBeAdded.price,
                        originalProductQuantity: itemToBeAdded.originalProductQuantity
                    });
                    toast.success(`${itemToBeAdded.name} Added To Cart`, {
                        position: 'bottom-left'
                    })
                }
            }
        },
        incrementProductQuantity(state, action) {
            const productIdToBeIncremented = action.payload;

            const existingItem = state.cartItems.find(cartItem => cartItem.id === productIdToBeIncremented);
            
            if(existingItem.originalProductQuantity === existingItem.quantity) {
                toast.error(`${existingItem.name} has no items left`, {
                    position: 'bottom-left'
                })
            }
            else {
                state.cartTotalQuantity++;
                state.cartTotalPrice += +existingItem.price;
                existingItem.quantity++;
                existingItem.totalPrice += +existingItem.price;
            }
        },
        decrementProductQuantity(state, action) {
            const productIdToBeDecremented = action.payload;

            const existingItem = state.cartItems.find(cartItem => cartItem.id === productIdToBeDecremented);

            state.cartTotalQuantity--;
            state.cartTotalPrice -= +existingItem.price;

            // if there is only one item of product in cart
            if (existingItem.quantity <= 1) {
                state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== productIdToBeDecremented);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= +existingItem.price;
            }
        },
        clearCart(state) {
            state.cartItems = [];
            state.cartTotalPrice = 0;
            state.cartTotalQuantity = 0;
            state.cartName = ''
        },
        nameCart(state, action) {
            state.cartName = action.payload;
        }
    }
})

const cartActions = cartSlice.actions;

export {
    cartActions
}

export default cartSlice;