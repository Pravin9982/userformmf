import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Suspense } from "react";
import SafeComponent from "./SafeComponent";
import "./index.css";
const Calculator = React.lazy(()=> import("../../calculatormf/src/Calculator")) ;
const UserForm = React.lazy(() => import("../../homemf/src/userForms"));
const Header = React.lazy(() => import("../../homemf/src/Header"));
const Footer = React.lazy(() => import("../../homemf/src/Footer"));

const App = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const [showCalculator, setShowCalculator] = useState(true);
  

  console.log('container app');

  const handleHeaderError = (error) => {
    console.error("Error loading Header:", error);
    setShowHeader(true); //Show the Header component fallback
  };

  const handleFooterError = (error) => {
    console.error("Error loading Footer:", error); 
    setShowFooter(true);// Show the Footer component fallback
  }
  
  const handleUserFormError = (error) => {
    console.error("Error loading UserForm:", error);
    setShowUserForm(false); // Show the UserForm component fallback
  };

  const handleCalculatorError = (error) => {
    console.error("Error loading Calculator:", error);
    setShowCalculator(false); // Show the Calculator component fallback
  };

  return (
    <div className="container">
      <SafeComponent onError={handleHeaderError}>
        {showHeader || (<Suspense fallback = {<div>Loading Header...</div>}>
        <Header />
        </Suspense>
        )}
      </SafeComponent>

      <div>Container App</div>

      <SafeComponent onError={handleUserFormError}>
        {showUserForm || (
          <Suspense fallback={<div>Loading UserForm...</div>}>
            <div className="userFormBox">
            <UserForm />
            </div>
            
          </Suspense>
        )}
      </SafeComponent>

      <SafeComponent onError={handleCalculatorError}>
        {showCalculator || (
          <Suspense fallback={<div>Loading Calculator...</div>}>
            <Calculator />
          </Suspense>
        )}
      </SafeComponent>

      <button onClick={() => setShowUserForm(!showUserForm)}>
        {showUserForm ? "Show UserForm" : "Hide UserForm"}
      </button>

      <button onClick={() => setShowCalculator(!showCalculator)}>
        {showCalculator ? "Show Calculator" : "Hide Calculator"}
      </button>

      <SafeComponent onError={handleFooterError}>
        {showFooter || (<Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
        )}
      </SafeComponent>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));



// import React from "react";
// import ReactDOM from "react-dom";
// import { Suspense, useState } from "react";
// import "./index.css";
// import Header from "homemf/Header";
// import Footer from "homemf/Footer";
// import UserForm from "../../homemf/src/userForms";
// import SafeComponent from "./SafeComponent";
// const Calculator = React.lazy(()=> import("../../calculatormf/src/Calculator")) ;

// const App = () => {
//   const [showHeader, setShowHeader]= useState(false);
//   console.log('container app');

//   return(
//   <div className="container">
//     <SafeComponent>
//      <Header/>
//     </SafeComponent>
   
//     <div>Container App</div>
//     <SafeComponent>
//      <UserForm/>
//     </SafeComponent>

//     <SafeComponent>
//       {showHeader && <Suspense fallback = {<div>Loading...</div>}>
//       <Calculator/>
//       </Suspense>}
//     </SafeComponent>

//     <button onClick={()=>setShowHeader(!showHeader)}>{showHeader ? "Close Calculator" : "Open Calculator"}</button>
//     <SafeComponent>
//      <Footer/>
//     </SafeComponent>
    
//   </div>
// );
// }
// ReactDOM.render(<App />, document.getElementById("app"));
