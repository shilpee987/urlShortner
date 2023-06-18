import express from 'express';
import Url from '../url.js';
const router = express.Router();

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      return res.redirect(url.origUrl);
    } else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('Server Error');
  }
});

export default router;