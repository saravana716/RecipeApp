import { createSlice, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Create a slice with initial state and reducers
const myslice = createSlice({
  name: "my-slice",
  initialState: {
    productarray: [],
    filterdata: [],
    favarray: [] ,
    cartlength:"",
isModalOpen:false,
singlecartdata: [],

  },
  reducers: {
    modalopen(store,actions){
        store.isModalOpen = true;
    },
    modalclose(store,actions){
        store.isModalOpen = false;
    },
    prouductArray(store, action) {
      store.productarray = action.payload;
      console.log(store.productarray);
    },
    filterarray(store, action) {
      store.filterdata = action.payload;
      console.log(store.filterdata);
    },
    favfilter(store, action) {
      const recipe = action.payload;
      store.favarray=recipe
console.log(store.favarray);
store.cartlength=store.favarray.length

  
       
        
      },
      sendcartdata(store, action) {
        store.singlecartdata = action.payload;
        console.log(store.singlecartdata);
      }
      
    
  }
});

// Redux Persist configuration
let persistConfig = {
  key: "root",
  storage,
  whitelist: [""] // Only persist favarray
};

let persistedReducer = persistReducer(persistConfig, myslice.reducer);

// Create store with persisted reducer
const Store = configureStore({
  reducer: persistedReducer
});

// Create persistor to persist the store
let persisters = persistStore(Store);

export let myreducer = myslice.actions; // Export actions for dispatch
export { Store, persisters }; // Export store and persister
