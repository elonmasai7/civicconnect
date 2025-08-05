import { getRepresentatives } from '../services/civic.api.js';

export const getRepsByAddress = async (req, res) => {
  try {
    const { address } = req.query;
    const reps = await getRepresentatives(address);
    res.json(reps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
