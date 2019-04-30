export class Ingredient {
    name: String;
    description: String;
    size: String;
    productLink: String;
    imageLink: String;

    constructor(ingredient) {
        this.name = ingredient && ingredient.name ? ingredient.name : null;
        this.description = ingredient && ingredient.description ? ingredient.description : null;
        this.size = ingredient && ingredient.size ? ingredient.size : null;
        this.productLink = ingredient && ingredient.productLink ? ingredient.productLink : null;
        this.imageLink = ingredient && ingredient.imageLink ? ingredient.imageLink : null;
    }
}
