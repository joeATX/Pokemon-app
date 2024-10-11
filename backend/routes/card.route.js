import express from "express";

import { createCard, deleteCard, getCardById, getCards, updateCard } from "../controller/card.controller.js";

const router = express.Router();

router.get("/", getCards) // GET all cards
router.get("/:id", getCardById); // GET a specific card by ID
router.post("/", createCard); // POST a new card
router.put("/:id", updateCard); // PUT to update a card by ID
router.delete("/:id", deleteCard); // DELETE a card by ID

export default router;