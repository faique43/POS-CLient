import React from "react";
import { useSelector, useDispatch } from "react-redux";

// components
import ProductCard from "../../components/UI/productCard/ProductCard";
import CartItem from "../../components/UI/cart/cartItem/CartItem";

// Mu
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// redux actions
import { cartActions } from "../../store/cartSlice/cartSlice";
import { kitchenActions } from "../../store/kitchenSlice/kitchenSlice";

export default function Kitchen2Home() {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);
    const cartItems = useSelector((state) => state.cart.carts[1].cartItems);
    const cart = useSelector((state) => state.cart.carts[1]);

    // const [cartName, setCartName] = useState('')

    const placeOrderHandler = () => {
        dispatch(
            kitchenActions.placeOrder({
                orderName: cart.cartName,
                orderItems: cartItems,
                orderItemsCount: cart.cartTotalQuantity,
                orderTotalPrice: cart.cartTotalPrice,
                orderTime: new Date(),
                orderStatus: false,
                kitchen: "2"
            })
        );
        dispatch(cartActions.clearCart({
            kitchen: "2"
        }));
    };

    const inputChangeHandler = (event) => {
        if (event.target.name === "cartName") {
            dispatch(cartActions.nameCart({
                kitchen: "2",
                name: event.target.value
            }));
            // setCartName(event.target.value)
        }
    };

    return (
        <div className="tw-grid tw-grid-cols-6">
            <div className="tw-col-span-4 tw-flex tw-items-center tw-flex-wrap tw-justify-evenly tw-gap-y-4 tw-p-4 tw-gap-x-1">
                {products.filter(product => product.kitchen === "2").map((product) => (
                    <ProductCard
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        description={product.description}
                        img={product.image}
                        price={product.price}
                        quantity={product.stock}
                        kitchen={product.kitchen}
                    />
                ))}
            </div>
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
                            />
                        ))}
                    </div>
                </div>

                {cart.cartTotalQuantity > 0 && (
                    <div className=" tw-flex tw-flex-col tw-gap-y-8">
                        <div className="tw-flex tw-items-center tw-justify-between">
                            <h1 className="tw-text-xl">Subtotal</h1>
                            <h1 className="tw-text-2xl tw-font-semibold">
                                ${cart.cartTotalPrice}
                            </h1>
                        </div>
                        <TextField
                            id="outlined-basic"
                            label="Order Name"
                            variant="outlined"
                            value={cart.cartName}
                            name="cartName"
                            onChange={inputChangeHandler}
                        />
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
        </div>
    );
}
