import mongoose from "mongoose";
import PokemonCard from "../models/card.model.js";
import axios from 'axios'

export const getCardById = async (req, res) => {
    const { id } = req.params; // Get the card ID from the request

    try {
        const response = await axios.get(`http://api.pokemontcg.io/v2/cards/${id}`);
        // Send back the data from the Pokémon API to your frontend
        res.status(200).json({ success: true, data: response.data });
    } catch (error ) {
        console.error("Error in fetching card data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getCards = async (req, res) => {
    // Extract query parameters from the request (optional)
    const { q, page = 1, pageSize = 250, orderBy, select } = req.query; 

    try {
        // Construct the query string for the API request
        let queryParams = `?page=${page}&pageSize=${pageSize}`;
        if (q) queryParams += `&q=${q}`;  // Search query (e.g., name:charizard)
        if (orderBy) queryParams += `&orderBy=${orderBy}`;  // Ordering (e.g., orderBy=name,-number)
        if (select) queryParams += `&select=${select}`;  // Specific fields to return (e.g., id,name)

        // Fetch cards data from the Pokémon TCG API
        const response = await axios.get(`https://api.pokemontcg.io/v2/cards/${queryParams}`);

        // Send back the data from the API to the frontend
        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error fetching cards data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createCard = async (req, res) => {
    const { id } = req.params; 

    try {
        const response = await axios.get(`http://api.pokemontcg.io/v2/cards/${id}`);
        // Here you might want to save the card in your database
        const newCard = new PokemonCard(response.data); // Create a new instance
        await newCard.save(); // Save to database
        res.status(201).json({ success: true, data: newCard });
    } catch (error) {
        console.error("Error in fetching card data:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateCard = async (req, res) => {
    const { id } = req.params;
    const card = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Card ID" });
    }

    try {
        const updatedCard = await PokemonCard.findByIdAndUpdate(id, card, { new: true });
        res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
        console.error("Error in updating card:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteCard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Card ID" });
    }

    try {
        await PokemonCard.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Card deleted" });
    } catch (error) {
        console.error("Error in deleting card:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


