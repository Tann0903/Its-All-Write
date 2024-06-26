const express = require('express');
const router = express.Router();
const Journal = require('../models/journal');

// Route to new journal entry
router.get('/journals/new', (req, res) => {
    res.render('new');
});

// CREATE
router.post('/journals', async (req, res) => {
    try {
        const { date, time, mood, song, subject, entry } = req.body;

        // Follow the schema
        const newJournal = new Journal({
            date,
            time,
            mood,
            song,
            subject,
            entry
        });

        // Save entry into DB
        await newJournal.save();
        
        // Redirect to the list of entries after submitting a new one
        res.redirect('/journals');
    } catch (err) {
        console.error(err);
        res.send('Error creating new journal entry');
    }
});

// GET all entries
router.get('/journals', async (req, res) => {
    try {
        const journals = await Journal.find({});
        res.render('index', { journals });
    } catch (err) {
        console.error(err);
        res.send('Error retrieving journals');
    }
});

// SHOW
router.get('/journals/:id', async (req, res) => {
    try {
      const journal = await Journal.findById(req.params.id);
      if (!journal) {
        return res.status(404).send('Journal not found');
      }
      res.render('show', { journal });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving journal entry');
    }
  });

// EDIT
router.get('/journals/:id/edit', async (req, res) => {
    try {
        const journal = await Journal.findById(req.params.id);
        res.render('edit', { journal });
    } catch (err) {
        console.error(err);
        res.send('Error retrieving journal entry for edit');
    }
});

// UPDATE
router.put('/journals/:id', async (req, res) => {
    try {
        const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/journals/${updatedJournal._id}`);
    } catch (err) {
        console.error(err);
        res.send('Error updating journal entry');
    }
});

// DELETE
router.delete('/journals/:id', async (req, res) => {
    try {
        await Journal.findByIdAndDelete(req.params.id);
        res.redirect('/journals');
    } catch (err) {
        console.error(err);
        res.send('Error deleting journal entry');
    }
});

module.exports = router;
