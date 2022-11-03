
const getAll = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(["Lext Fridman"]);
};