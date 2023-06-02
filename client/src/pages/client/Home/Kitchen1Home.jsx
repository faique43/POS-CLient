import React from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import ProductCard from "../../../components/UI/productCard/ProductCard";
import CartItem from "../../../components/UI/cart/cartItem/CartItem";

// Mu
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// redux actions
import { cartActions } from "../../../store/cartSlice/cartSlice";
import { kitchenActions, createOrder, getAllOrders } from "../../../store/kitchenSlice/kitchenSlice";
import { uiActions } from "../../../store/uiSlice/uiSlice";

export default function Kitchen1Home() {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const cartItems = useSelector((state) => state.cart.carts[0].cartItems)
    const cart = useSelector((state) => state.cart.carts[0]);

    // const [cartName, setCartName] = useState('')

    const placeOrderHandler = () => {
        const products = cartItems.map(cartItem => {
            return {
                product: cartItem.id,
                quantity: cartItem.quantity
            }
        })
        const orderObject = {
            name: cart.cartName,
            products
        }

        dispatch(uiActions.startLoading())
        dispatch(createOrder(orderObject)).then(response => {
            if (!response.error) {
                dispatch(cartActions.clearCart({
                    kitchen: "1"
                }));
                dispatch(getAllOrders())
            }
            dispatch(uiActions.stopLoading())
        })

        // dispatch(
        //     kitchenActions.placeOrder({
        //         orderName: cart.cartName,
        //         orderItems: cartItems,
        //         orderItemsCount: cart.cartTotalQuantity,
        //         orderTotalPrice: cart.cartTotalPrice,
        //         orderTime: new Date(),
        //         orderStatus: false,
        //         kitchen: "1",
        //     })
        // );
    };

    const inputChangeHandler = (event) => {
        if (event.target.name === "cartName") {
            dispatch(cartActions.nameCart({
                kitchen: "1",
                name: event.target.value
            }));
            // setCartName(event.target.value)
        }
    };

    return (
        <div className="tw-grid tw-grid-cols-6">
            <div className={`${cart.cartTotalQuantity === 0 ? 'tw-col-span-6' : 'tw-col-span-4'} tw-flex tw-items-center tw-flex-wrap tw-justify-evenly tw-gap-y-4 tw-p-4 tw-gap-x-1`}>
                {products.filter(product => product.kitchen === "1").map((product) => (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        description={product.description}
                        img={product.image}
                        price={product.price}
                        kitchen={product.kitchen}
                    />
                ))}
            </div>

            {cart.cartTotalQuantity !== 0 &&
                <div className="tw-col-span-2 tw-bg-gray-200 tw-flex tw-flex-col tw-p-4 tw-gap-y-24">
                    <div className="tw-flex tw-flex-col tw-gap-y-4">
                        <Typography variant="h4">
                            {cart.cartTotalQuantity === 0
                                ? "Nothing here, start adding products in the cart"
                                : "Current Order"}
                        </Typography>

                        <div className="tw-flex tw-flex-col tw-gap-y-4">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    img={item.img}
                                    price={item.price}
                                    quantity={item.quantity}
                                    totalPrice={item.totalPrice}
                                    description={item.description}
                                    kitchen={1}
                                />
                            ))}
                        </div>
                    </div>

                    {cart.cartTotalQuantity > 0 && (
                        <div className=" tw-flex tw-flex-col tw-gap-y-8">
                            <div className="tw-flex tw-items-center tw-justify-between">
                                <h1 className="tw-text-xl">Subtotal</h1>
                                <h1 className="tw-text-2xl tw-font-semibold">
                                    Rs {cart.cartTotalPrice}
                                </h1>
                            </div>
                            {/* <TextField
                                id="outlined-basic"
                                label="Order Name"
                                variant="outlined"
                                value={cart.cartName}
                                name="cartName"
                                onChange={inputChangeHandler}
                            /> */}
                            <Button
                                className="tw-w-full"
                                variant="contained"
                                onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}
