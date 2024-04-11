import React, { useEffect, useState } from 'react';
import './Datapage.css';

function Datapage() {
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
      return <div className='loading'>Loading... We are fetching projects from there source in real time</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="App">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Repository URL</th>
              <th>Tech Stack</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map(repo => (
              <tr key={repo.name}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td><a href={repo.url}>Visit Repository</a></td>
                <td>{repo.tech_stack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default Datapage;
