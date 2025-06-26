import '../styles/Button.css'; 

function Button({ label}) {
  return (
    <button onClick={ () => console.log(`Button clicked: ${label}`)} className="test-btn">
      {label}
    </button>
  );
}

export default Button;
