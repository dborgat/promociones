// resources/js/app.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;

function App() {
    return (
        <h1>aaaaaaaaaaaaaaaaaaaaaa</h1>
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //         <Route path="/about" element={<About />} />
        //     </Routes>
        // </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
console.log(root, '<<<<<-----------------root')
root.render(<App />);
