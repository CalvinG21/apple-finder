import './App.css';
import Favourites from './components/Favourites';
import SearchPage from './components/SearchPage';
import NavBar from './components/NavBar';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
       {/* Any component outside of the routes tag gets rendered on every webpage*/}
       <NavBar />

          {/* React Router is used for client-side navigation between webpages*/}
          <Routes>
              <Route exact path="/" element={<SearchPage></SearchPage>} />
              <Route path="/favourites" element={<Favourites></Favourites>} />
          </Routes>
          
       
    </div>
  );
}

export default App;
