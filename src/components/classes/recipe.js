// import data from './data/mdocs.json'
import data from './data/docx.json'

export class recipe {
    constructor(ClassName, mDisplayName, mIngredients, mProduct, mManufactoringDuration){
        this.id = ClassName;
        this.name = mDisplayName;
        this.duration = mManufactoringDuration;
        this.ingredients = mIngredients;
        this.products = mProduct;
    }

    static materials = [] 

    static getRecipes(){
        this.fillMaterialList(data);
        var rawRecipes = this.extractRecipes(data);
        var parsedRecipesResponse = this.parseRecipes(rawRecipes);
        var sortedRecipes = this.sortRecipes(parsedRecipesResponse)
        return sortedRecipes
    }

    static sortRecipes(unsortedRecipes){
        return unsortedRecipes.sort((recipeA, recipeB) => {
            if(recipeA.name > recipeB.name){
                return 1
            }
            if(recipeA.name < recipeB.name){
                return -1
            }
            return 0
        })
    }

    static extractRecipes(unfilteredData){
        var FGRecipes = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGRecipe'")
        var producableOnly = FGRecipes[0].Classes.filter((item) => ((item.mProducedIn != "") 
        && (item.mProducedIn != "(/Game/FactoryGame/Equipment/BuildGun/BP_BuildGun.BP_BuildGun_C)")  
        && (item.mProducedIn != "(/Script/FactoryGame.FGBuildGun)")
        && (item.mProducedIn != "(/Game/FactoryGame/Buildable/-Shared/WorkBench/BP_WorkshopComponent.BP_WorkshopComponent_C)")
        ))
        return (producableOnly)
    }

    static parseRecipes(FGRecipes){
        let parsedRecipes = [] 
        FGRecipes.forEach((fgr) => {
            // let testString = "((ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/RawResources/Sulfur/Desc_Sulfur.Desc_Sulfur_C\"',Amount=6),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/AluminumPlate/Desc_AluminumPlate.Desc_AluminumPlate_C\"',Amount=7),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Plastic/Desc_Plastic.Desc_Plastic_C\"',Amount=8),(ItemClass=BlueprintGeneratedClass'\"/Game/FactoryGame/Resource/Parts/Wire/Desc_Wire.Desc_Wire_C\"',Amount=12))";
            // https://regex101.com/r/QFayWv/2
            // regex muss S{10} anstatt S{11} sein (komisch, ist aber so)
            const regex1 = /(\.((Desc|BP_EquipmentDescriptor|BP_ItemDescriptor)(\w*)))\S{10}(\d*)\)/g
            let matches1 = [];
            let match1;
            while ((match1 = regex1.exec(fgr.mIngredients)) !== null){
                matches1.push(match1)
                match1 = null
            }       
            var ingredients = []
            matches1.forEach((match) => {
                var id = match[2];
                var amount = match[5];
                var material = this.materials.find((material) => material.id == id);
                if(material == null){
                    console.log(id)
                }
                else{
                    if((material.form == "RF_LIQUID" || material.form == "RF_GAS") && fgr.ClassName != "Recipe_CrudeOil_C"){
                        amount = amount/1000
                    }
                    ingredients.push(new materialLineItem(amount, material));
                }
            })

            // https://regex101.com/r/QFayWv/2
            // regex muss S{10} anstatt S{11} sein (komisch, ist aber so)
            // /(\.(Desc(\w*)))\S{10}(\d*)\)/g
            const regex2 = /(\.((Desc|BP_EquipmentDescriptor|BP_ItemDescriptor)(\w*)))\S{10}(\d*)\)/g
            let matches2 = [];
            let match2;
            while ((match2 = regex2.exec(fgr.mProduct)) !== null){
                matches2.push(match2)
                match2 = null
            }    
            var products = []
            matches2.forEach((match) => {
                var id = match[2];
                var amount = match[5];
                var material = this.materials.find((material) => material.id == id);
                if(material == null){
                    console.log(id)
                }
                else{
                    if((material.form == "RF_LIQUID" || material.form == "RF_GAS") && fgr.ClassName != "Recipe_CrudeOil_C"){
                        amount = amount/1000
                    }
                    products.push(new materialLineItem(amount, material));
                }
            })
            parsedRecipes.push(new recipe(fgr.ClassName, fgr.mDisplayName, ingredients, products, parseFloat(fgr.mManufactoringDuration)))
        })
        return parsedRecipes;
    }

    static fillMaterialList(unfilteredData){
        var mixedMaterials = this.extractMaterials(unfilteredData);
        this.materials = this.parseMaterials(mixedMaterials);
    }

    static extractMaterials(unfilteredData){
        // var mixedMaterials = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptor'"
        //     || item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptor'"
        //     || item.NativeClass == "Class'/Script/FactoryGame.FGResourceDescriptor'"
        //     || item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptorBiomass'"
        //     || item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeProjectile'"
        //     || item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'"
        //     || item.NativeClass == "Class'/Script/FactoryGame.FGConsumableDescriptor'"
        //     || item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'"
        //     )
        var FGItemDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptor'")
        var FGResourceDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGResourceDescriptor'")
        var FGItemDescriptorBiomass = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptorBiomass'")
        var FGAmmoTypeProjectile = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeProjectile'")
        var FGItemDescriptorNuclearFuel = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'")
        var FGConsumableDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGConsumableDescriptor'")
        var FGAmmoTypeSpreadshot = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'")
        var FGAmmoTypeInstantHit = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeInstantHit'")
        var FGEquipmentDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGEquipmentDescriptor'")
        var mixedMaterials = FGItemDescriptor[0].Classes.concat(FGResourceDescriptor[0].Classes);
        var mixedMaterials = mixedMaterials.concat(FGItemDescriptorBiomass[0].Classes)
        var mixedMaterials = mixedMaterials.concat(FGAmmoTypeProjectile[0].Classes)
        var mixedMaterials = mixedMaterials.concat(FGItemDescriptorNuclearFuel[0].Classes)
        var mixedMaterials = mixedMaterials.concat(FGConsumableDescriptor[0].Classes)
        var mixedMaterials = mixedMaterials.concat(FGAmmoTypeSpreadshot[0].Classes)
        var mixedMaterials = mixedMaterials.concat(FGAmmoTypeInstantHit[0].Classes)
        var mixedMaterials = mixedMaterials.concat(FGEquipmentDescriptor[0].Classes)
        return (mixedMaterials)
    }

    static parseMaterials(mixedMaterials){
        var materials = []
        mixedMaterials.forEach((mixedMaterial) => materials.push(new material(mixedMaterial.ClassName, mixedMaterial.mDisplayName, mixedMaterial.mForm)))
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
    constructor(id, name, form){
        this.name = name;
        this.id = id;
        this.form = form;
    }

    getUnit = () => {
        if(this.form == "RF_LIQUID" || this.form == "RF_GAS"){
            return "m3/min"
        }
        else{
            return "items/min"
        }
    }
}