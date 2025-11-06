import passport from "./passport.js";

export const autenticar = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        mensaje: "Token requerido o inválido",
      });
    }
    req.usuario = user;
    next();
  })(req, res, next);
};