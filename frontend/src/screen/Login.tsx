import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const App = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading,setLoading]=useState(false);



const loginHandler = async () => {
  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  setLoading(true);

  try {
    const res = await axios.post("https://easyride-9o6e.onrender.com/api/login", {
      email:username,
      password,
    });
    alert("Login successful");
    localStorage.setItem("token", res.data.token);
    navigate("/");
    window.location.reload();  //load the screen
  } catch (error: any) {
    console.error("Login error:", error);
    alert(error.response?.data?.message || "Login failed");
    setLoading(false);
  }
};

const [yescopied,setYescopied]=useState(false);

const filldetails=()=>{
  const name="sagarrajyadav@gmail.com";
  const pass="1234567";
  if(!yescopied){
  setUsername(name);
  setPassword(pass);
  setYescopied(true);
  }else{
    setUsername("");
    setPassword("");
    setYescopied(false);
  }
    
}


  return (
    <div style={styles.maincontainer}>

      <div style={styles.container}>
        <h2 style={styles.heading}>Login to Your Account</h2>

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

        <button
         onClick={loginHandler}
        style={styles.button}>{ loading ?"loading....":"Sign In"}</button>

        
<p>click to copy credentials and fill into input</p>
<button 
style={{cursor:"pointer",
  backgroundColor:yescopied? "green" : "grey",color:"white"
   ,fontSize:"16px",fontWeight:"bold",
   borderRadius:"10px",border:"none",padding:"6px"
   }}
onClick={filldetails}
>
{yescopied  ? "copied ✅" : "click to copy" } 
</button>


       <div style={styles.sample}>
  <p>Use these credentials for sample login:</p>
  <p>Email:<strong> sagarrajyadav@gmail.com</strong></p>
  <p>Password: <strong>1234567</strong></p>
</div>

        <p style={{ margin: '10px 0' }}>or</p>
        <p>
          Don't have an account? 
          <button
         onClick={()=>navigate('/signup')}
          style={styles.button2}> Create Account</button>
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
    alignItems: "center" as const,
    flexDirection: "column" as const,
  },
  container: {
    margin:"100px 0",
    width: '90%',
    maxWidth: '400px',
    padding: "30px 20px",
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
 sample: {
  border: "2px solid #4A90E2",
  backgroundColor: "#f0f8ff",
  padding: "6px",
  marginTop: "8px",
  borderRadius: "12px",
  color: "#333",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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

export default App;
