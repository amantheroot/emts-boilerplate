import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { JwtPayload } from "jsonwebtoken";
import { User } from "@/models";
import config from "./config";
import { tokenTypes } from "./tokens";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: JwtPayload, done: VerifiedCallback) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
