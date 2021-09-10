export function authHeader(params) {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
      return { 
        'Authorization': user.token,
        ...params
      };
  } else {
      return {};
  }
}


export function getToken() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
}
