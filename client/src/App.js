import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Add from "./Views/Add";
import Liste from "./Views/Liste";
import ListeIndex from "./Views/ListeIndex";
import ListeProduit from "./Views/ListeProduit";
import Cart from "./Views/Cart";
import Update from "./Views/Update";
import Register from "./Views/Register";

import ListeProdAdmin from "./Views/ListeProdAdmin";
import UpdateAdmin from "./Views/UpdateAdmin";
import AddAdmin from "./Views/AddAdmin";

import DetailProd from "./Views/DetailProd";

import "./style.css";
import "./bootstrap/css/bootstrap.min.css"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<ListeIndex />}/>
          <Route path="/listeProduit" element={<ListeProduit />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/register" element={<Register />}/>

          <Route path="/listeProdAdmin" element={<ListeProdAdmin />}/>
          <Route path="/updateAdmin/:id" element={<UpdateAdmin />}/>
          <Route path="/addAdmin" element={<AddAdmin />}/>

          <Route path="/detailProd" element={<DetailProd />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
