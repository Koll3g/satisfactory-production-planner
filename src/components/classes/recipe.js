// import data from './data/mdocs.json'
import data from './data/docx.json'

export class recipe {
    constructor(ClassName, mDisplayName, mIngredients, mProduct, mManufacturingDuration){
        this.id = ClassName;
        this.name = mDisplayName;
        this.duration = mManufacturingDuration;
        this.ingredients = mIngredients;
        this.products = mProduct;
    }

    static materials = [] 

    static getRecipes(){
        this.fillMaterialList(data);
        var rawRecipes = this.extractRecipes(data);
        var parsedRecipesResponse = this.parseRecipes(rawRecipes);
        var test = 1;
        return parsedRecipesResponse
    }

    static extractRecipes(unfilteredData){
        var FGRecipes = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGRecipe'")
        return (FGRecipes[0].Classes)
    }

    static parseRecipes(FGRecipes){
        let parsedRecipes = [] 
        FGRecipes.forEach((fgr) => {
            // let testString = "((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/RawResources/Sulfur/Desc_Sulfur.Desc_Sulfur_C\"',Amount=6),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/AluminumPlate/Desc_AluminumPlate.Desc_AluminumPlate_C\"',Amount=7),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Plastic/Desc_Plastic.Desc_Plastic_C\"',Amount=8),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Wire/Desc_Wire.Desc_Wire_C\"',Amount=12))";
            
            const regex1 = /(\.(Desc(\w*)))\S{10}(\d*)\)/g
            let matches1 = [];
            let match1;
            while ((match1 = regex1.exec(fgr.mIngredients)) !== null){
                matches1.push(match1)
                match1 = null
            }       
            var ingredients = []
            matches1.forEach((match) => {
                var id = match[2];
                var amount = match[4];
                var material = this.materials.find((material) => material.id == id);
                ingredients.push(new materialLineItem(amount, material));
            })

            const regex2 = /(\.(Desc(\w*)))\S{10}(\d*)\)/g
            let matches2 = [];
            let match2;
            while ((match2 = regex2.exec(fgr.mProducts)) !== null){
                matches2.push(match2)
                match2 = null
            }    
            var products = []
            matches2.forEach((match) => {
                var id = match[3];
                var amount = match[5];
                var material = materials.find((material) => material.id == id);
                products.push(new materialLineItem(amount, material));
            })
            parsedRecipes.push(new recipe(fgr.ClassName, fgr.mDisplayName, ingredients, products, fgr.mManufacturingDuration))
        })
        var test = 1;
        return parsedRecipes;
    }





    static fillMaterialList(unfilteredData){
        var mixedMaterials = this.extractMaterials(unfilteredData);
        this.materials = this.parseMaterials(mixedMaterials);
    }

    static extractMaterials(unfilteredData){
        var FGItemDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptor'")
        var FGResourceDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGResourceDescriptor'")
        var mixedMaterials = FGItemDescriptor[0].Classes.concat(FGResourceDescriptor[0].Classes);
        return (mixedMaterials)
    }

    static parseMaterials(mixedMaterials){
        var materials = []
        mixedMaterials.forEach((mixedMaterial) => materials.push(new material(mixedMaterial.ClassName, mixedMaterial.mDisplayName)))
        return materials;
    }



    static getTestRecipes(){
        console.log(data)

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

export class ingredients{
    /**
     * @param {materialLineItem[]} MaterialLineItems
     */
    constructor(MaterialLineItems)
    {
        this.MaterialLineItems = MaterialLineItems;
    }
}

export class materialLineItem{
    constructor(amount, Material)
    {
        this.amount = amount;
        this.material = Material;
    }
}

export class products{
    /**
     * @param {materialLineItem[]} MaterialLineItems
     */
     constructor(MaterialLineItems)
     {
         this.MaterialLineItems = MaterialLineItems;
     }
}

export class material{
    constructor(id, name){
        this.name = name;
        this.id = id;
    }
}