const getAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({"title": "Hello there!", "message": "Welcome to my API!"});
};

module.exports = {
    getAll
};