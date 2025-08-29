"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { interfacecolor } from "@/interface/interfacecolor";
import { interfacesize } from "@/interface/interfacesize";
import { interfaceProduct } from "@/interface/product.interface";
import { Getdetailallcart, Getallcartitem,updateCartItem,deletecart } from "@/service/cartservice";
import { useUser } from "./usercontext";

export interface CartItem {
  product_id: number;
  size_id: number;
  color_id: number;
  quantity: number;
}

export interface Cartdetail {
  cart_id:number;
  product: interfaceProduct;
  size: interfacesize;
  color: interfacecolor;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartdetail: Cartdetail[];
  loading: boolean;
  savecart: () => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (product_id: number, size_id: number, color_id: number, quantity: number) => void;
  removeFromCart: (product_id: number, size_id: number, color_id: number) => void;
  clearCart: () => void;
  deleteCart:()=>void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartdetail, setCartdetail] = useState<Cartdetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from API / localStorage once when user changes
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      console.log('loading true');
      if (user) {
        try {
          const data = await Getallcartitem();
          if (data?.data?.data) {
            setCart(data.data.data);
          }
        } catch (err) {
          console.error("Fetch cart error:", err);
          setCart([]);
        }
      } else {
        const cartStr = localStorage.getItem("cart");
        const localCart = cartStr ? JSON.parse(cartStr) : [];
        setCart(localCart);
      }
    };

    fetchCart();
  }, [user]);

  // Update cart detail whenever cart changes
  useEffect(() => {
    if (cart.length === 0) {
      setCartdetail([]);
      setLoading(false);
      return;
    }

    const fetchCartDetail = async () => {
      
      
      try {
        const data = await Getdetailallcart(cart);
        // console.log(data.data.data.length);
        
        setCartdetail(data.data.data || []);
      } catch (err) {
        console.error("loi lay chi tiet gio hang:", err);
        setCartdetail([]);
      } finally {
        setLoading(false);
        // console.log('loading false');
        
      }
    };

    fetchCartDetail();
  }, [cart]);

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const exist = prev.find(
        i => i.product_id === item.product_id && i.size_id === item.size_id && i.color_id === item.color_id
      );
      if (exist) {
        return prev.map(i =>
          i.product_id === item.product_id && i.size_id === item.size_id && i.color_id === item.color_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  }, []);

  const updateQuantity = (product_id: number, size_id: number, color_id: number, quantity: number) => {
    setCart(prev =>
      prev.map(i =>
        i.product_id === product_id && i.size_id === size_id && i.color_id === color_id
          ? { ...i, quantity }
          : i
      )
    );
  };

  const removeFromCart = (product_id: number, size_id: number, color_id: number) => {
    setCart(prev => prev.filter(i => !(i.product_id === product_id && i.size_id === size_id && i.color_id === color_id)));
  };
  const deleteCart = async() =>{
    setCart([]);
    setCartdetail([]);
    await deletecart();
  }


  const clearCart = () => setCart([]);


  const savecart = async() =>{
    // console.log(cart);
    // console.log(cartdetail);

    const updatedata = cartdetail.map((item) =>({
       color_id: item.color.id,
       product_id: item.product.id,
       quantity: item.quantity,
       size_id: item.size.id,
       cart_id: item.cart_id,
    }))
    console.log(updatedata);
    
    if(user){
          const data = await updateCartItem(updatedata);
    // console.log(data.data);
      if(data.data.success === false){
        return{
          error: data.data.message || "Cập nhật giỏ hàng thất bại"
        }

    }
    }else{
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(updatedata));
    }
    
    
    
  }
  return (
    <CartContext.Provider value={{ cart, cartdetail,savecart, deleteCart,loading, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
