export class recipe {
    constructor(id, name, duration, MaterialInput, MaterialOutput){
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.MaterialInput = MaterialInput;
        this.MaterialOutput = MaterialOutput;
    }

    static getTestRecipes(){
        var testRecipe1 = new recipe(
            1, 
            "Coated Iron Plate", 
            12, 
            new materialInput([
                new materialLineItem(10, new material("Iron Ingot", "url")), 
                new materialLineItem(2, new material("Plastic", "url"))
            ]), 
            new materialOutput([
                new materialLineItem(15, new material("Iron Plate", "url"))
            ])
        );
        var testRecipe2 = new recipe(
            2, 
            "Iron Plate", 
            6, 
            new materialInput([
                new materialLineItem(3, new material("Iron Ingot", "url")), 
            ]), 
            new materialOutput([
                new materialLineItem(2, new material("Iron Plate", "url"))
            ])
        );
        return [testRecipe1, testRecipe2];
    }
}

export class materialInput{
    /**
     * @param {materialLineItem[]} MaterialLineItems
     */
    constructor(MaterialLineItems)
    {
        this.MaterialLineItems = MaterialLineItems;
    }
}

export class materialLineItem{
    constructor(quantity, Material)
    {
        this.quantity = quantity;
        this.material = Material;
    }
}

export class materialOutput{
    /**
     * @param {materialLineItem[]} MaterialLineItems
     */
     constructor(MaterialLineItems)
     {
         this.MaterialLineItems = MaterialLineItems;
     }
}

export class material{
    constructor(name, iconUrl){
        this.name = name;
        this.iconUrl = iconUrl;
    }
}