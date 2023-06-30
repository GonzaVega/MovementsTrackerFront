// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/js/dist/dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ModalProvider } from "./context/modalContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/authContext";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { ModalProvider } from "./context/modalContext";

// ReactDOM.render(
//   <BrowserRouter>
//     <AuthProvider>
//       <ModalProvider>
//         <App />
//       </ModalProvider>
//     </AuthProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// reportWebVitals();
