import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


function updateManifest() {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const manifest = document.querySelector('link[rel="manifest"]');
    if (manifest) {
        manifest.href = isDarkMode ? "/dark-site.webmanifest" : "/light-site.webmanifest";
    }
}

updateManifest();
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateManifest);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
