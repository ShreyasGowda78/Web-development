import mongoose, { plugin } from "mongoose";

const gameSchema = new mongoose.Schema({
    player1Name: { type: String, required: true },
    player2Name: { type: String, required: true },
    player1Score: { type: Number, default: 0 },
    player2Score: { type: Number, default: 0 },
    winner : { type: String, default: null },
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);
export default Game;
