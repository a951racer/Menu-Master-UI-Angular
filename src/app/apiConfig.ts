import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

export const apiConfig = {
    apiUrl: apiUrl,
    signinURL: apiUrl + '/auth/login',
    signupURL: apiUrl + '/auth/register',
    dayURL: apiUrl + '/day',
    mealURL: apiUrl + '/meal',
    mealSlotURL: apiUrl + '/mealSlot',
    recipeURL: apiUrl + '/recipe',
    ingredientURL: apiUrl + '/ingredient',
    menuURl: apiUrl + '/menu'
  };
