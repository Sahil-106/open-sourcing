import react,{ useEffect,useState} from 'react';
import './App.css';

function App() {
  const[data,setData]=useState({})
  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async()=>{
    try{
      const response= await fetch('https://fuzzy-giggle-5gqvrj495666cvq4j-5000.app.github.dev/repositories');
      const jsondata=await response.json();
      setData(jsondata);
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className="App">
       <h7>{data}</h7>
      
    </div>
  );
}

export default App;
