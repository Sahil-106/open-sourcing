import React, { useEffect, useState } from 'react';
import './Datapage.css';

function Datapage() {
    const [data, setData] = useState([]);
    const [gitlabData, setGitlabData] = useState([]);
    const [codebergData, setCodebergData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchData();
      fetchGitlabData();
      fetchCodebergData();
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

    const fetchGitlabData = async () => {
      try {
        const response = await fetch('https://open-sourcing.onrender.com/repogitlab');
        if (!response.ok) {
          throw new Error('Failed to fetch Gitlab data');
        }
        const jsondata = await response.json();
        setGitlabData(jsondata);
      } catch (error) {
        setError(error.message);
      }
    }

    const fetchCodebergData = async () => {
      try {
        const response = await fetch('https://open-sourcing.onrender.com/repocodeberg');
        if (!response.ok) {
          throw new Error('Failed to fetch Codeberg data');
        }
        const jsondata = await response.json();
        setCodebergData(jsondata);
      } catch (error) {
        setError(error.message);
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
            {data && data.map(repo => (
              <tr key={repo.name}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td><span>Github</span></td>
                <td>{repo.last_Update}</td>
                <td><a href={repo.url}>Visit Repository</a></td>
                <td>{repo.tech_stack}</td>
              </tr>
            ))}
            {gitlabData && gitlabData.map(repo => (
              <tr key={repo.name}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td><span>Gitlab</span></td>
                <td>{repo.last_Update}</td>
                <td><a href={repo.url}>Visit Repository</a></td>
                <td>{/* No Tech Stack */}</td>
              </tr>
            ))}
            {codebergData && codebergData.map(repo => (
              <tr key={repo.name}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td><span>Codeberg</span></td>
                <td>{repo.last_Update}</td>
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
