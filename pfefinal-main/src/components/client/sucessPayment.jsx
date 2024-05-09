import React, { useEffect, useState , useRef } from 'react';
import { Link } from "react-router-dom";
import {createOrder} from '../../features/orderslice'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart} from '../../features/cartslice'; 
import {updateArticleQte} from "../../features/articleslice"

const Success = () => {

  const dataFetchedRef = useRef(false);

  const cart = useSelector((state) => state.storecart);
  
  const dispatch = useDispatch();

  const [nomClient, setNomClient] = useState('');
  const [emailClient, setEmailClient] = useState('');

  const transaction = () => {

    fetch('http://localhost:3001/api/payment/recuperer-details-transaction/'+localStorage.getItem("sessionId"))
    .then(response => response.json())
    .then(data => {
        setNomClient(data.nomClient);
        setEmailClient(data.emailClient);
        localStorage.removeItem("sessionId")
        if(data.nomClient) addOrder(data.nomClient,data.emailClient)
    })
    .catch(error => console.error('Erreur lors de la récupération des détails de la transaction:', error));
    
  }

   useEffect(() => {  
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    transaction();
  }, []);

const addOrder = (name,email) => { 
    console.log(cart)
            const lineOrder= cart.cartItems.map((lc) => ({
              article: lc._id,
              quantity: lc.cartQuantity,
              price: lc.prix*lc.cartQuantity
            }));

            const objectOrder ={
              "user": name +"-"+email,
              "status":"Not processed",
              "amount":cart.cartTotalAmount,
              "allProduct": lineOrder
            }
            console.log(objectOrder)
            dispatch(createOrder(objectOrder)).then(() => {
            dispatch(clearCart());
            })
            
         
                cart.cartItems.map((c)=>{
                    const art={
                        nouvqtestock:c.qtestock-c.cartQuantity,
                        _id:c._id
                    }

                dispatch(updateArticleQte(art))
                  })
            
    }

  return (
    <div>

      <div>

        <h1>Thank You</h1>
      <div>
           <h3>Nom : {nomClient}</h3>
           <h3>Email : {emailClient}</h3>
        </div>
     
        <p>Order Placed Successfully</p>

        <Link to="/articlesclient">
        <span  onClick={() =>dispatch(clearCart())}>Another Shopping</span>
        </Link>

      </div>

    </div>
  )
}

export default Success
