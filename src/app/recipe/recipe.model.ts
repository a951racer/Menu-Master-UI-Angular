export class recipe {
    name: String;
    description: string;
    ingredients: any[];
    instructions: string;
    cookTemp: string;
    cookTime: string;

    constructor(props) {
        this.name = props.name || null;
        this.description = props.description || null;
        this.ingredients = props.ingredients || [];
        this.instructions = props.instructions || null;
        this.cookTemp = props.cookTemp || null;
        this.cookTime = props.cookTime || null;
    }
}
