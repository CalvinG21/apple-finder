import { configureStore } from '@reduxjs/toolkit'
import searchResultsReducer from './searchResultsSlice'

//store must be imported and set in index.js so all components in app's tree heirachy will have access to read/save state to store 
//can have multiple stores, each store will hold data for a particular category/thing
export const store = configureStore({
  reducer: {
    searchedResults:searchResultsReducer
  },
})

