import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTeam = () => {
  const [players, setPlayers] = useState([]);
  const [teamarr, setteamarr] = useState([]);  // Currently selected team (max 11 players)
  const [error, setError] = useState(null);

  // Fetching players from backend
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/create-team');
        setPlayers(response.data);
        if (response.data.length === 0) {
          setError('No player available');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Failed to fetch players');
      }
    };
    fetchPlayers();
  }, []);

  // Handle adding a player to the team
  const handleAddPlayer = (player) => {
    if (teamarr.length < 11) {
      setteamarr((prev) => [...prev, player]);
    }
  };

  // Handle removing a player from the team
  const handleRemovePlayer = (player) => {
    setteamarr((prev) => prev.filter((p) => p.PlayerName !== player.PlayerName));
  };

  // Function to post team to the backend
  const postTeamToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/teams', {
        team: teamarr,
      });

      console.log('Team successfully posted:', response.data);
      // Clear teamarr after posting
      setteamarr([]);
    } catch (error) {
      console.error('Error posting team:', error);
    }
  };

  // Once team reaches 11 players, send to backend and reset team
  useEffect(() => {
    if (teamarr.length === 11) {
      postTeamToBackend();
    }
  }, [teamarr]);

  // Check if a player is already added to the team
  const isPlayerAdded = (player) => {
    return teamarr.some((p) => p.PlayerName === player.PlayerName);
  };

  const noPlayerStyle = {
    color: 'white', 
    fontSize: '1.2em', 
    textAlign: 'center', 
    padding: '20px', 
    backgroundColor: 'black',
  };

  return (
    <div className='bg-black min-h-screen text-white'>
      <h2 className='ProductsTitle'>Player List</h2>
      {error ? (
        <p style={noPlayerStyle}>{error}</p>
      ) : (
        <div className='text-white'>
          {players.length > 0 ? (
            players.map((player, index) => (
              <div key={index} style={{ border: '2px solid #898686' }} className='flex gap-24 overflow-auto p-2 m-3 w-1/2 rounded-lg'>
                <div className='flex-col items-start justify-center gap-0'>
                  <p className='text-3xl'>Name: {player.PlayerName}</p>
                  <p className='text-3xl'>Points: {player.points}</p>
                  <p style={{ color: 'white' }} className='text-xl'>({player.description})</p>
                  
                  {/* Add/Remove button logic */}
                  {isPlayerAdded(player) ? (
                    <button
                      className='text-red-500 mt-2 bg-transparent border border-red-500 p-2 rounded'
                      onClick={() => handleRemovePlayer(player)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className='text-green-500 mt-2 bg-transparent border border-green-500 p-2 rounded'
                      onClick={() => handleAddPlayer(player)}
                      disabled={teamarr.length === 11}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p style={noPlayerStyle}>No player available</p>
          )}
        </div>
      )}

      {/* Show selected team */}
      <div className='mt-5'>
        <h3 className='text-2xl'>Current Team (Max 11 players):</h3>
        <ul>
          {teamarr.map((player, index) => (
            <li key={index}>{player.PlayerName} - {player.points}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateTeam;
