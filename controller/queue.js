exports.displayMessage = (req, res) => {
  res.render(`index`, { title: `Basic message queue pub/sub` });
};
