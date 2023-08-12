import { createSlice } from '@reduxjs/toolkit'

//In Redux, a slice represents a portion of your application's state along with the reducers and actions associated with it. 
//It's a more concise and structured way to define your state and actions.

const initialState = {
  updates: 0,
  searchResults:[],
  displaySearchResults:false,
}

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
        updateSearchResults: (state) => {
            //Redux Toolkit allows us to write "mutating" logic in reducers. It
            //doesn't actually mutate the state because it uses the Immer library,
            //which detects changes to a "draft state" and produces a brand new
            //immutable state based off those changes
            state.updates += 1;
            console.log("update Search Results");
        },

        setSearchResults:(state,action)=>{
            state.searchResults=action.payload.searchResults;
        },

        setDisplaySearchResults:(state,action)=>{
            state.displaySearchResults=action.payload.displaySearchResults;
        },
  },
})

// Action creators are generated for each case reducer function
//export actions to be used by react components
export const { updateSearchResults, setSearchResults,setDisplaySearchResults } = searchResultsSlice.actions

export default searchResultsSlice.reducer

//In Redux
//3 main things state, action, reducer

//1. state is the variables stored in redux
//2. actions are what react components call when they want to modify variables in the redux state
//3. reducers do modifications to state based on the action calls

//*actions can be called by react components to trigger areducer that will modify the state in some sort of awy.