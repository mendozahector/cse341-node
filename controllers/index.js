const getAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({"message": "Hello there!", "to": "Lex Fridman"});
};

module.exports = {
    getAll
  };