import React from 'react';

function Button({ label}) {
  return (
    <button onClick={ () => console.log(`Button clicked: ${label}`)} className="button">
      {label}
    </button>
  );
}

export default Button;
