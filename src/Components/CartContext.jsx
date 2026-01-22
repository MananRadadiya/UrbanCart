import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const exists = cart.find((item) => item.id === product.id);

        if (exists) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                )
            );
            return;
        }

        setCart([...cart, { ...product, qty: 1 }]);
    };

    const increaseQty = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, qty: item.qty + 1 } : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCart(
            cart.map((item) =>
                item.id === id && item.qty > 1
                    ? { ...item, qty: item.qty - 1 }
                    : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQty,
                decreaseQty,
                removeFromCart,
                clearCart,
                totalAmount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
