/*
 * Google OAuth routes. Redirect destinations are restricted to the configured
 * frontend origin to prevent open-redirect attacks.
 */
const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const returnToCookieName = 'authReturnTo';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/v1/auth/google/callback'
}, (accessToken, refreshToken, profile, cb) => {
  const user = {
    id: profile.id,
    userName: profile.displayName || '',
    email: (profile.emails && profile.emails[0] && profile.emails[0].value) || '',
    PhotoURL: (profile.photos && profile.photos[0] && profile.photos[0].value) || ''
  };
  cb(null, user);
}));

/**
 * Only allow absolute redirects to the configured frontend origin. If there
 * is no configured origin, allow same-site relative paths only.
 */
function safeReturnTo(candidate) {
  if (typeof candidate !== 'string' || !candidate.trim()) return null;

  const configuredOrigin = process.env.CORS_CLIENT_ORIGIN;
  if (!configuredOrigin) {
    return candidate.startsWith('/') && !candidate.startsWith('//')
      ? candidate
      : null;
  }

  try {
    const allowed = new URL(configuredOrigin);
    const target = new URL(candidate, allowed);
    if (target.origin !== allowed.origin) return null;
    return target.href;
  } catch {
    return null;
  }
}

router.get('/google', (req, res, next) => {
  const returnTo = safeReturnTo(req.query.returnTo);
  if (returnTo) res.cookie(returnToCookieName, returnTo, { httpOnly: true, sameSite: 'lax' });
  else res.clearCookie(returnToCookieName);
  next();
}, passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
}));

router.get('/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    const returnTo = safeReturnTo(req.cookies[returnToCookieName]) ||
      process.env.CORS_CLIENT_ORIGIN || '/';
    res.clearCookie(returnToCookieName);
    res.redirect(returnTo);
  }
);

function logout(req, res) {
  req.logout((err) => {
    if (err) {
      console.error('Logout failed:', err);
      return res.status(500).json({ message: 'Could not log out.' });
    }

    const returnTo = safeReturnTo(req.query.returnTo);
    if (returnTo) return res.redirect(returnTo);
    return res.json({ message: 'Logged out.' });
  });
}

router.get('/logout', logout);
router.post('/logout', logout);

module.exports = router;
