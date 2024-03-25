const express = require('express');
//  Create a express router object
const router = express.Router();

// Define your API routes
router.get('/healthcheck', (req, res) => {
  res.send('I am OK');
});

router.get('/', (req, res) => {
    // Path to the index.html file
    const indexPath = path.join(__dirname, '../../frontend/index.html');
    // Send the index.html file as response
    res.sendFile(indexPath);    
    
});



// Export the router object
module.exports = router;