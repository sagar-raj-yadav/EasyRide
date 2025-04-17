import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  
    const [Name,setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  
  return (
    <div style={styles.maincontainer}>

      <div style={styles.container}>
        <h2 style={styles.heading}>Login to Your Account</h2>

        <input 
          type="text"
          placeholder="Enter your Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input 
          type="text"
          placeholder="Enter your Email/Phone"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input 
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <input 
          type="password"
          placeholder="Confirm your Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />

        <button style={styles.button}>Sign Up</button>

        <p style={{ margin: '10px 0' }}>or</p>
        <p>
          Already have an account? 
          <button 
          onClick={()=>navigate('/login')}
          style={styles.button2}> Login Account</button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  maincontainer: {
    backgroundColor: "#b0c4e6",
    width: '100%',
    height: '100vh',
    display: "flex",
    justifyContent: "flex-start" as const,
    alignItems: "center",
    flexDirection: "column" as const,
  },
  container: {
    margin:"40px 0",
    width: '90%',
    maxWidth: '400px',
    padding: "10px 20px",
    backgroundColor: "#ffffffdd",
    borderRadius: "20px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column" as const, 
    alignItems: "center" as const,
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  input: {
    padding: "12px 20px",
    borderRadius: "30px",
    width: "90%",
    margin: "10px 0",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    width: "100%",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#ff6464",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  button2: {
    backgroundColor: "transparent",
    color: "#007bff",
    border: "none",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default SignUp;
