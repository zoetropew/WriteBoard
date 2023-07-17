const bodyParser = require('body-parser');
const express = require('express');
const PORT = 5000;
const app = express();
app.use(bodyParser.json());
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
    const data = {
        message: 'Hello from the backend API'
    };
    res.json(data);
})