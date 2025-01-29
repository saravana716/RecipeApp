import React from 'react'
import { useEffect,useState} from 'react'
import axios from 'axios'
import "./FoodRecipe.css"
import RecipeCart from '../RecipeCart/RecipeCart'
import { useDispatch } from 'react-redux'
import { myreducer } from '../../Store/Store'
import { useSelector } from 'react-redux'
const FoodRecipe = () => {
const [dataArray, setdataArray] = useState([])


const selector=useSelector(function (data) {
    return data.filterdata
})
console.log(selector);

const dispatch = useDispatch()
useEffect(() => {
    async function apicall(params) {
        try{
let result = await axios.get("https://dummyjson.com/recipes")
let recipeData = result.data.recipes
console.log(recipeData);

setdataArray(recipeData)

dispatch(myreducer.prouductArray(recipeData))

        }
        catch(error){
            console.log(error)
        }
    }

    apicall()
}, [])
useEffect(()=>{
    setdataArray(selector)
},[selector])
console.log(dataArray);

  return (
    <>
   <div className='HomeMain'>
   <div className='Home'>
    <RecipeCart arrayprop={dataArray}/>
    </div>
   </div>
    </>
  )
}

export default FoodRecipe