OAuth2.adapter('todoist', {
  /**
   * @return {URL} URL to the page that returns the authorization code
   */
  authorizationCodeURL: function(config) {
    return ('https://todoist.com/oauth/authorize?' +
      'client_id={{CLIENT_ID}}&' +
      'scope={{API_SCOPE}}&' +
      'state={{STATE}}&' +
      'redirect_uri={{REDIRECT_URI}}')
        .replace('{{CLIENT_ID}}', config.clientId)
        .replace('{{API_SCOPE}}', config.apiScope)
        .replace('{{STATE}}', config.state)
        .replace('{{REDIRECT_URI}}', this.redirectURL(config));
  },

  /**
   * @return {URL} URL to the page that we use to inject the content
   * script into
   */
  redirectURL: function(config) {
    return 'https://todoist.com/robots.txt';
  },

  /**
   * @return {String} Authorization code for fetching the access token
   */
  parseAuthorizationCode: function(url) {
    var error = url.match(/[&\?]error=([^&]+)/);
    if (error) {
      throw 'Error getting authorization code: ' + error[1];
    }
    return url.match(/[&\?]code=([\w\/\-]+)/)[1];
  },

  /**
   * @return {URL} URL to the access token providing endpoint
   */
  accessTokenURL: function() {
    return 'https://todoist.com/oauth/access_token';
  },

  /**
   * @return {String} HTTP method to use to get access tokens
   */
  accessTokenMethod: function() {
    return 'POST';
  },

  /**
   * @return {Object} The payload to use when getting the access token
   */
  accessTokenParams: function(authorizationCode, config) {
    return {
      code: authorizationCode,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      redirect_uri: this.redirectURL(config),
      grant_type: 'authorization_code'
    };
  },

  /**
   * @return {Object} Object containing accessToken {String},
   * refreshToken {String} and expiresIn {Int}
   */
  parseAccessToken: function(response) {
    return {
      accessToken: JSON.parse(response).access_token,
      expiresIn: Number.MAX_VALUE
    };
  }
});