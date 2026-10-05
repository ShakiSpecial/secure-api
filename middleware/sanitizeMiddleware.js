const sanitize = (obj) => {
  for (const key in obj) {
    if (key.includes("$") || key.includes(".")) {
      delete obj[key];
    } else if (
      typeof obj[key] === "object" &&
      obj[key] !== null
    ) {
      sanitize(obj[key]);
    }
  }
};

const sanitizeMiddleware = (req, res, next) => {
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

module.exports = sanitizeMiddleware;