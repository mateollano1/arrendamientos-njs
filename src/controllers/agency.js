const Agency = require('../models/agency/model');

const getAgencies = async (req, res) => {
  try {
    const agency = await Agency.find({});
    return res.status(200).json(agency);
  } catch (error) {
    return res.status(500).json({ Message: 'Somethin went wrong' });
  }
};

const createAgency = (req, res) => {
  const agency = new Agency(req.body);
  try {
    agency.save();
    return res.json({ Message: 'Agency created' });
  } catch (error) {
    return res.status(500).json({ Message: 'Somethin went wrong' });
  }
};

module.exports = {
  getAgencies,
  createAgency,
};
