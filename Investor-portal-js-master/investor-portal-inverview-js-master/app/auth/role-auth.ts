function(user, context, callback) {
    const namespace = 'http://localhost:3000/api/auth/google/callback';
  
    if (context.authorization && context.authorization.roles) {
      const assignedRoles = context.authorization.roles;
  
      if (context.idToken) {
        const idTokenClaims = context.idToken;
        idTokenClaims[`${namespace}/Account`] = assignedRoles;
        context.idToken = idTokenClaims;
      }
  
      if (context.accessToken) {
        const accessTokenClaims = context.accessToken;
        accessTokenClaims[`${namespace}/Account`] = assignedRoles;
        context.accessToken = accessTokenClaims;
      }
    }
  
    callback(null, user, context);
  }