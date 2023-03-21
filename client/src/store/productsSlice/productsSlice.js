import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            id: 1,
            name: "Soap",
            price: "100",
            img: "https://stylesweet.com/wp-content/uploads/2022/06/ChocolateCakeForTwo_Featured.jpg",
            description: "This is a cake"
        }
    ]
}

const productsSlice = createSlice({
    name: "products",
    initialState
})

export default productsSlice;