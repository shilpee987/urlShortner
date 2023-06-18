import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../url.js';
import { validateUrl } from '../utils/utils.js';


const router = express.Router();

router.post('/chotaKaro', async (req, res)=>{

  const { origUrl } = req.body;
  

  const urlId = nanoid(9);

  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `http://localhost:8080/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err)
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

// module.exports = router;

 export default router;