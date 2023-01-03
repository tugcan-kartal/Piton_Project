// import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import UserPage from "./components/UserPage";
import SignUpPage from "./components/SignUpPage";
import ProductsPage from "./components/ProductsPage";
// import ProductDetails from "./components/ProductDetails";
import { Toaster } from 'react-hot-toast';
import './index.css';


function App() {
  return (

    <Router>

      <div className="App">

        <Toaster />

        <Routes>

          <Route path="/" exact element={<UserPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/ProductsPage" element={<ProductsPage />} />
          {/* <Route path="/ProductDetails" element={<ProductDetails />} /> */}

        </Routes>
      </div>

    </Router>
    
  );
}

export default App;
