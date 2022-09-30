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
        return this.parseRecipes(rawRecipes);
    }

    static extractRecipes(unfilteredData){
        var FGRecipes = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGRecipe'")
        return (FGRecipes[0].Classes)
    }

    static parseRecipes(FGRecipes){
        return parsedRecipes = FGRecipes.forEach((fgr) => {
            // https://regex101.com/r/2pvsYm/2
            const reg = /m/.exec("mmmm")
            // const regex1 = /(\.(Desc(\w*)))\S{10}(\d*)\)/.exec(fgr.mIngredients)
            // const regi = new Regex("(\.(Desc(\w*)))\S{10}(\d*)");
            // const regex1 = regi.match("((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/RawResources/Sulfur/Desc_Sulfur.Desc_Sulfur_C\"',Amount=6),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/AluminumPlate/Desc_AluminumPlate.Desc_AluminumPlate_C\"',Amount=7),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Plastic/Desc_Plastic.Desc_Plastic_C\"',Amount=8),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Wire/Desc_Wire.Desc_Wire_C\"',Amount=12))")
            // const regex1 = /(\.(Desc(\w*)))\S{10}(\d*)\)/g.exec("((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/RawResources/Sulfur/Desc_Sulfur.Desc_Sulfur_C\"',Amount=6),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/AluminumPlate/Desc_AluminumPlate.Desc_AluminumPlate_C\"',Amount=7),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Plastic/Desc_Plastic.Desc_Plastic_C\"',Amount=8),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Wire/Desc_Wire.Desc_Wire_C\"',Amount=12))")
           
            // const regex1 = /(\.(Desc(\w*)))/.exec(fgr.mIngredients);
            // regex1.exec(fgr.mIngredients);
            // var matchAll1 = regex1.matchAll(fgr.mIngredients)
            let testString = "((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/RawResources/Sulfur/Desc_Sulfur.Desc_Sulfur_C\"',Amount=6),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/AluminumPlate/Desc_AluminumPlate.Desc_AluminumPlate_C\"',Amount=7),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Plastic/Desc_Plastic.Desc_Plastic_C\"',Amount=8),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Wire/Desc_Wire.Desc_Wire_C\"',Amount=12))";
            
            const regex1 = /(\.(Desc(\w*)))\S{10}(\d*)\)/g
            let matches = [];
            let match;
            while ((match = regex1.exec(testString)) !== null){
                matches.push(match)
                match = null
            }       
            var ingredients = matches.forEach((match) => {
                var id = match[2];
                var amount = match[4];
                var material = this.materials.find((material) => material.id == id);
                return new materialLineItem(amount, material);
            })

            const regex2 = /(\.(Desc(\w*)))\S{10}(\d*)\)/g
            var matchAll2 = regex1.exec(fgr.mProducts);
            var products = matchAll2.forEach((match) => {
                var id = match[3];
                var amount = match[5];
                var material = materials.find((material) => material.id == id);
                return new materialLineItem(amount, material);
            })
            // var ingredients = fgr.mIngredients.forEach((mIngredient) => {
            //     const regex = new RegExp('(\.(Desc(\S*)))\\');
            //     var id = regex.match(mIngredient)[3];
            //     var material = materials.find((material) => material.id == id);
            //     return new materialLineItem(mIngredient.Amount, material);
            // });
            // var products = fgr.mProduct.forEach((mProductX) => {
            //     const regex = new RegExp('(\.(Desc(\S*)))\\');
            //     var id = regex.match(mProductX)[3];
            //     var material = materials.find((material) => material.id == id);
            //     return new materialLineItem(mProductX.Amount, material);
            // })
            return new recipe(fgr.ClassName, fgr.mDisplayName, ingredients, products, fgr.mManufacturingDuration)
        })
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
        var materials = mixedMaterials.forEach((mixedMaterial) => {return new material(mixedMaterial.ClassName, mixedMaterial.mDisplayName)})
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