import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import FoodRecipe from '../Component/FoodRecipe/FoodRecipe'
import Modal from "react-modal";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from "../Assets/shopping-cart.png"
import "./Home.css"
import { useDispatch } from 'react-redux';
import { IoCloseOutline } from "react-icons/io5";
import { myreducer } from '../Store/Store';
const Home = () => {
    const dispatch = useDispatch();
    const modalselector=useSelector(function (data) {
        return data.isModalOpen
    })
    const cartselector = useSelector(function (data) {
        return data.singlecartdata
    })
    console.log(cartselector);
    
function closeModal() {
    dispatch(myreducer.modalclose(false))
}

  return (
    <>
      <Modal
     isOpen={modalselector} // Control modal visibility
     onRequestClose={closeModal} // Close modal on request
     className="cartmodel"
    >
{cartselector.map(function (data) {
    return (<div className='datadisplay'>
        <div className='cartimgleft'>
            <img src={data.image} alt="" />
        </div>
        <div className='cartpopup'>
           <div className='foodhead'>
            <h4><span>Cuisine</span> : {data.cuisine}</h4>
            <h4><span>MealType</span> : {data.mealType}</h4>
            <h4></h4>
           </div>
           <div>
            <h1>{data.name}</h1>
           <div className='ingredients'>
           <h2>Instructions</h2>
         <p className='contents'>{data.instructions}</p>
           </div>
           <div className='ingredients'>
           <h2>Ingredients
           </h2>
        <p  className='contents'>{data.ingredients
           }</p>
           </div>
           <div className='dataslider'>
            <p><span>Rating</span> : {data.rating}</p>
            <p><span>ReviewsCount</span> : {data.reviewCount}</p>
           </div>
           <div className='dataslider'>
            <p><span>Servings</span> : {data.servings}</p>
            <p><span>Prepare</span> : { data.
prepTimeMinutes} (min)</p>
           </div>
           <div className='dataslider'>
            <p><span>Calories</span> : {data.
caloriesPerServing
}</p>
            <p><span>Cooking Time</span> : {data.
cookTimeMinutes
}</p>
           </div>
           </div>
        </div>
        <div className='icon' onClick={closeModal}>
        <IoCloseOutline  className='closeicon'/>

        </div>
    </div>)
})}
    </Modal>
    <Navbar/>
    <FoodRecipe/>
  
    </>
  )
}

export default Home