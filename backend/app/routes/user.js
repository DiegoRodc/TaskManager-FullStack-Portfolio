/*
 * Return the authenticated user's public profile fields.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { id, userName, email, PhotoURL } = req.user;
  return res.status(200).json({ id, userName, email, PhotoURL });
});

module.exports = router;
