import { useEffect,useState} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://open-sourcing.onrender.com/repositories');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsondata = await response.json();
      setData(jsondata);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      {data && data.map(repo => (
        <div key={repo.name}>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <a href={repo.url}>Visit Repository</a>
          <p>Tech Stack: {repo.tech_stack}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
