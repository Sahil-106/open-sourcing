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
        const responses = await Promise.all([
          fetch('https://open-sourcing.onrender.com/repositories'),
          fetch('https://open-sourcing.onrender.com/repogitlab'),
          fetch('https://open-sourcing.onrender.com/repocodeberg')
        ]);

        const jsondata = await Promise.all(responses.map(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        }));

        const combinedData = [
          ...jsondata[0].map(repo => ({ ...repo, platform: 'Github' })),
          ...jsondata[1].map(repo => ({ ...repo, platform: 'Gitlab' })),
          ...jsondata[2].map(repo => ({ ...repo, platform: 'Codeberg' }))
        ];

        setData(combinedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  
    if (loading) {
      return (
        <div className="loading-container">
            <div className="loading">
                <img src="loader.gif" alt="Loading..." style={{ width: '300px', height: 'auto' }} />
                <p>Loading... We are fetching projects from their source in real-time</p>
            </div>
        </div>
      );
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
              <th>Platform</th>
              <th>Last Updated</th>
              <th>Repository URL</th>
              <th>Tech Stack</th>
            </tr>
          </thead>
          <tbody>
            {data.map(repo => (
              <tr key={repo.name}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td><span>{repo.platform}</span></td>
                <td>{repo.last_Update}</td>
                <td><a href={repo.url}>Visit Repository</a></td>
                <td>{repo.tech_stack || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default Datapage;
