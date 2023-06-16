import { createContext, useContext } from "react";
import { useState } from "react";
import CartModal from "./components/CartModal";

// creating the context.
export const itemContext = createContext();

// creating a custom Provider(Provide)
function CustomItemProvider(props){
    const [total, setTotal] = useState(0);
    const [item, setItem] = useState(0);
    const [showCart, setShowcart] = useState(false);
    const [cart, setCart] = useState([]);

    const handleAdd = (prod) => {
        const index = cart.findIndex((element)=> element.id === prod.id);

        if(index === -1){
          setCart([...cart, {...prod, qty:1}]);
          console.log(cart);
          setItem(item +1);
          setTotal(total + prod.price);
        }
        else{
          cart[index].qty += 1;
          setCart(cart);
          setItem(item +1);
          setTotal(total + prod.price);
          console.log(cart);
        }
      };
    
      const handleRemove = (prod) => {
        const index = cart.findIndex((element)=> element.id === prod.id);
        
        if(index !== -1){
          cart[index].qty -= 1;
          setTotal(total-cart[index].price);
          setItem(item-1);
          if(cart[index].qty === 0){
            cart.splice(index, 1);
          }
        }
      };

      const handleReset = () => {
        setItem(0);
        setTotal(0);
        setCart([]);
      }

      const toggle = () => {
        setShowcart(!showCart);
      }

      const clear = () => {
        setItem(0);
        setTotal(0);
        setCart([]);
      }

    return(
        <itemContext.Provider value={
          {total,
            handleAdd,
            item,
            handleRemove,
            handleReset,
            toggle,
            clear,
            cart}
        }>
            {showCart && <CartModal />}
            {props.children}
        </itemContext.Provider>
    )
}

// Consuming the context
export function useValue(){
    return useContext(itemContext);
}

export default CustomItemProvider;