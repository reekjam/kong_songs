const request = require('request');

const clientSecret = process.env.CLIENT_SECRET
const clientId = process.env.VUE_APP_CLIENT_ID
const redirectUri = process.env.VUE_APP_REDIRECT_URI

const auth = (req, res, next) => {
  const code = req.query.code;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(clientId + ':' + clientSecret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    const accessToken = body.access_token;
    const refreshToken = body.refresh_token;
    const maxAge = body.expires_in;
    const expiration = new Date(Number(new Date()) + (maxAge * 1000));

    res.cookie('token', accessToken, { expires: expiration, httpOnly: false});
    res.cookie('refresh', refreshToken);
    res.redirect('/')
  });
}

module.exports = auth