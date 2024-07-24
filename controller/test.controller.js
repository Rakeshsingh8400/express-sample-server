exports.testPost = async (req, res) => {
    const { data } = req.body;

    try {
        // Process the data as needed
        res.status(200).json({ message: 'Test post successful', data });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};