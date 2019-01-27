//const apiUrl = 'https://menu-master-api.herokuapp.com';
const apiUrl = 'http://localhost:3700';

export const apiConfig = {
    apiUrl: apiUrl,
    signinURL: apiUrl + '/auth/login',
    signupURL: apiUrl + '/auth/register',
    dayURL: apiUrl + '/day',
    mealURL: apiUrl + '/meal',
    recipeURL: apiUrl + '/recipe',
    ingredientURL: apiUrl + '/ingredient',
    menuURl: apiUrl + '/menu'
  };
