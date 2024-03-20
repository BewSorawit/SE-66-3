// project/server/controllers/fullcalendar.js
const createEvent = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createEvent };
