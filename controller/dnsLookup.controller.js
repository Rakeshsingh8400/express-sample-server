exports.dnsLookup = async (req, res) => {
    const { domain } = req.body;

    try {
        // Process the data as needed
        res.status(200).json({ domain: domain });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};