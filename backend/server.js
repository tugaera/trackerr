const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Conectar ao MongoDB
mongoose.connect('mongodb://mongo:27017/trackerr', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());

// Modelo de configuração
const configSchema = new mongoose.Schema({
    discordToken: String,
    overseerrApiUrl: String,
    overseerrApiKey: String
});
const Config = mongoose.model('Config', configSchema);

// Rota para salvar as configurações
app.post('/api/config', async (req, res) => {
    const { discordToken, overseerrApiUrl, overseerrApiKey } = req.body;
    
    try {
        const config = await Config.findOneAndUpdate({}, {
            discordToken,
            overseerrApiUrl,
            overseerrApiKey
        }, { upsert: true, new: true });
        
        res.status(200).json(config);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao salvar configurações' });
    }
});

// Rota para buscar as configurações
app.get('/api/config', async (req, res) => {
    try {
        const config = await Config.findOne();
        res.status(200).json(config);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar configurações' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
