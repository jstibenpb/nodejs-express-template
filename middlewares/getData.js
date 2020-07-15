const getGeoip = async (req, res, next) => {
  req.requestInfo = {
    userData: {
      ip: req.ipInfo.ip,
      city: req.ipInfo.city,
      country: req.ipInfo.country,
      region: req.ipInfo.region,
    },
    method: req.method,
    originalUrl: req.originalUrl,
  };
  next();
};

module.exports = { getGeoip };
