const roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Only ${allowedRoles.join(', ')} can access this` 
      });
    }
    next();
  };
};

module.exports = roleCheck;
