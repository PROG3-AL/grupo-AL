import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const CLAVE = process.env.CLAVE_JWT; 

const opciones = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: CLAVE,
};

passport.use(
  new JwtStrategy(opciones, (payload, done) => {
    try {
      // payload es lo que metés en generarToken()
      if (!payload) return done(null, false);

      // devolvés el payload como "usuario"
      return done(null, payload);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;