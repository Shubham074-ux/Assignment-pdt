import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  // Fetch teams from backend on component 
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${PORT}/api/teams`);
        setTeams(response.data);
        if (response.data.length === 0) {
          setError('No teams available');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to fetch teams');
      }
    };

    fetchTeams();
  }, []);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  };

  const teamCardStyle = {
    border: '2px solid white',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: '#1e1e1e',
    color: 'black',
    textAlign: 'left',
  };

  const teamHeaderStyle = {
    fontSize: '1.5em',
    borderBottom: '1px solid #888',
    paddingBottom: '10px',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#f39c12',
  };

  const playerStyle = {
    border: '1px solid gray',
    backgroundColor:'gray',
    borderRadius:'4px',
    fontSize: '1em',
    marginBottom: '8px',
  };

  return (
    <div className='bg-black min-h-screen text-white p-4'>
      <h2 className='text-3xl mb-4 text-center'>Created Teams</h2>
      {error ? (
        <p className='text-center text-red-500'>{error}</p>
      ) : (
        <div style={containerStyle}>
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <div key={index} style={teamCardStyle}>
                <h3 style={teamHeaderStyle}>Team {index + 1}</h3>
                <ul>
                  {team.team.map((player, playerIndex) => (
                    <li key={playerIndex} style={playerStyle}>
                      <span className='font-bold'>{player.PlayerName}</span> - {player.points} points
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className='text-center'>No teams created yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Teams;
