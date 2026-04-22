import Game from '../models/gameModels.js';

export const AddGameResult = async (req, res) => {
    const { player1Name, player2Name, player1Score, player2Score } = req.body;
    if (!player1Name || !player2Name || player1Score === undefined || player2Score === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const winner = player1Score > player2Score ? player1Name : player2Name;
    try {
        const newGame = await Game.create({ player1Name, player2Name, player1Score, player2Score, winner });
        res.status(201).json({ message: 'Game result added successfully', game: newGame });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding game result', error: error.message });
    }
}   

