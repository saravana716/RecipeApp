import React from "react";
import "./RecipeCart.css";
import { MdFavorite } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { myreducer } from "../../Store/Store";
const RecipeCart = (props) => {
    const dispatch = useDispatch();
    const [fav, setFav] = useState([])
  console.log(props);
  let recipedata = props.arrayprop;
  console.log(recipedata);
  function getfavcart(data) {
    console.log(data);

    // Check if the item is already in the fav list
    const isAlreadyFav = fav.find(item => item.id === data.id);  // Assuming 'id' is unique for each item
    
    if (!isAlreadyFav) {
      setFav(favoriteData => {
        const updatedFav = [...favoriteData, data];
        dispatch(myreducer.favfilter(updatedFav)); // Update the state in Redux
        return updatedFav;
      });
    } else {
      console.log("Item is already in the favorites.");
      alert("Item is already in the favorites")
    }
  }
console.log(fav);
function getcartdata(params) {
    let result= recipedata.filter(function (data) {
        return data.id==params
    })
    console.log(result);
    dispatch(myreducer.sendcartdata(result));
    dispatch(myreducer.modalopen())
}
  return (
    <>
      {recipedata.map(function (event) {
        return (
          <div className="RecipeCart">
            <div className="RecipeCartimg">
              <img src={event.image} alt="" />
            </div>
            <div className="RecipeCartContent">
              <div className="foodName">
                <h2>{event.cuisine}</h2>
                <h2>{event.mealType}</h2>
              </div>
              <h3>{event.name}</h3>
              <div className="foodName">
                <h4><span>Rating</span> : {event.rating}</h4>
                <h4><span>Reviews</span> : {event.reviewCount}</h4>
              </div>
              <div className="foodName">
                <h4><span>Servings</span> : {event.servings}</h4>
                <h4><span>Prepare Time</span> : {event.prepTimeMinutes}</h4>
              </div>
              <div className="RecipeCartActions">
                <button>Add to Cart</button>
                <button onClick={()=>getcartdata(event.id)} className="view">view</button>
              </div>
            </div>
            <h6>
            <MdFavorite  className="favicon" onClick={()=>getfavcart(event)}/>
            </h6>  
          </div>
        );
      })}
    </>
  );
};

export default RecipeCart;
