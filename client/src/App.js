import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./routes/Cart";
import Home from "./routes/Home";
import Details from "./routes/Details";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Details />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <Header />
//         <Home />
//       </div>
//     );
//   }
// }
