module.exports.getStatus = async (res) => {
  res.status(200).json({ healthy: true });
};
