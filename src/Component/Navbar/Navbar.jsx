import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import "./Navbar.css";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { myreducer } from "../../Store/Store";
const Navbar = () => {
    const [hide, sethide] = useState(false)
    const [empty, setempty] = useState(false)
  const [searchvalue, setsearchvalue] = useState("");
  const dispatch = useDispatch();
  const myselector = useSelector(function (data) {
    return data.productarray;
  });
  console.log(myselector);
  const favortieSelector = useSelector(function (data) {
    return data.favarray;
  });
  console.log(favortieSelector);
  const favortieslength = useSelector(function (data) {
    return data.cartlength;
  });
  console.log(favortieslength);

  function getinputvalue(event) {
    console.log(event.target.value);
    setsearchvalue(event.target.value);
    let filterdata = myselector.filter(function (data) {
      return (
        data.cuisine.toLowerCase().includes(event.target.value.toLowerCase()) ||
        data.mealType[0]
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        data.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    console.log(filterdata);
    dispatch(myreducer.filterarray(filterdata));
    if (event.target.value == "") {
      dispatch(myreducer.filterarray(myselector));
    }
  }
  function opendivfav() {
    sethide(!hide);
    if (favortieslength>=1) {
    setempty(true)
        
    }
    
  }
  console.log(empty);
  useEffect(() => {
    if (favortieslength>=1) {
   setempty(true)
        
    }
  }, [favortieslength])
  
  
  return (
    <>
      <div className="navbar">
        <h1>FOODIES</h1>
        <div className="searchbar">
          <input type="text" placeholder="Search Here......" onChange={getinputvalue} />
          <IoSearch className="searchicon" />
        </div>
        <span onClick={opendivfav}>
          <MdFavorite className="favicon" />
          {favortieslength==0?"":<p>{favortieslength}</p>}
        </span>{" "}


      {  <div className={hide?"favcart1":"favcart"}>
        {!empty&& <div className="cartempty">
            <h1>Your Cart is Empty</h1>
        </div>}
          {empty && favortieSelector.map(function (data) {
            return( <div className="favcartdata">
                <div className="cartimg">
                    <img src={data.image} alt="" />
                </div>
                <div className="cartContent">
                   <div className="carttop">
                   <p>{data.cuisine}</p>
                   <p>{data.mealType[0]}</p>
                   </div>
                    <h3>{data.name}</h3>
                    <div className="cartbottom">
                   <p><h6>Reviews</h6> : {data.reviewCount}</p>
                   <p><h6>Rating</h6> : {data.rating}</p>
                   </div>  <div className="cartbottom">
                   <p> <h6>Servings</h6> : {data.servings}</p>
                   <p><h6>Prepare Time</h6> : {data.prepTimeMinutes} (min)</p>
                   </div>

                </div>
            </div>)
           })}
        </div>}
      </div>
    </>
  );
};

export default Navbar;
