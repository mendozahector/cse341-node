const getAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({"title": "Hello there!", "message": "Welcome to my API!", "documentation": "https://mendozahectorcse341.onrender.com/api-docs/"});
};

module.exports = {
    getAll
};