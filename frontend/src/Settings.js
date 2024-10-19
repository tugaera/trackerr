import React, { useState } from 'react';
import axios from 'axios';

function Settings() {
  const [discordToken, setDiscordToken] = useState('');
  const [overseerrApiUrl, setOverseerrApiUrl] = useState('');
  const [overseerrApiKey, setOverseerrApiKey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      discordToken,
      overseerrApiUrl,
      overseerrApiKey,
    };

    try {
      await axios.post('/api/config', config);
      alert('Configurações salvas com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar configurações.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Discord Bot Token:</label>
          <input
            type="text"
            value={discordToken}
            onChange={(e) => setDiscordToken(e.target.value)}
          />
        </div>
        <div>
          <label>Overseerr API URL:</label>
          <input
            type="text"
            value={overseerrApiUrl}
            onChange={(e) => setOverseerrApiUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Overseerr API Key:</label>
          <input
            type="text"
            value={overseerrApiKey}
            onChange={(e) => setOverseerrApiKey(e.target.value)}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default Settings;
