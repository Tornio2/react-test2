import React from 'react';
import '../../styles/Settings.css';

function AppearanceSettings({ darkMode, setDarkMode }) {
  return (
    <div className="setting-section">
      <h3>Appearance</h3>
      <div className="setting-item">
        <label className="custom-checkbox-label">
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)}
            className="custom-checkbox-input"
          />
          <div className="custom-checkbox"></div>
          Dark Mode
        </label>
      </div>
    </div>
  );
}

export default AppearanceSettings;


// import React from 'react';
// import '../../styles/Settings.css';

// function AppearanceSettings({ darkMode, setDarkMode }) {
//   return (
//     <div className="setting-section">
//       <h3>Appearance</h3>
//       <div className="setting-item">
//         <label>
//           <input 
//             type="checkbox" 
//             checked={darkMode} 
//             onChange={() => setDarkMode(!darkMode)} 
//           />
//           Dark Mode
//         </label>
//       </div>
//     </div>
//   );
// }

// export default AppearanceSettings;