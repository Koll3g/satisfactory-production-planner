import data from './data/docx.json'

const recipeList = []
const recipeDictionary = {}

export class recipe {
    constructor(ClassName, mDisplayName, mIngredients, mProduct, mManufactoringDuration){
        this.id = ClassName;
        this.name = mDisplayName;
        this.duration = mManufactoringDuration;
        this.ingredients = mIngredients;
        this.products = mProduct;
    }

    static materials = []

    static generateRecipes(){
        this.fillMaterialList(data);
        let rawRecipes = this.extractRecipes(data);
        let parsedRecipesResponse = this.parseRecipes(rawRecipes);
        let sortedRecipes = this.sortRecipes(parsedRecipesResponse)
        recipeList = sortedRecipes
        mapRecipes()
    }

    static mapRecipes(){
        for(i=0; i<recipeList.length; i++){
            recipeDictionary[recipeList[i].id] = recipeList[i]
        }
    }

    static getRecipes(){
        console.log("generating recipe list from json file")
        this.fillMaterialList(data);
        let rawRecipes = this.extractRecipes(data);
        let parsedRecipesResponse = this.parseRecipes(rawRecipes);
        let sortedRecipes = this.sortRecipes(parsedRecipesResponse)
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
        let FGRecipes = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGRecipe'")
        let producableOnly = FGRecipes[0].Classes.filter((item) => ((item.mProducedIn != "") 
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
            let ingredients = []
            matches1.forEach((match) => {
                let id = match[2];
                let amount = match[5];
                let material = this.materials.find((material) => material.id == id);
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
            let products = []
            matches2.forEach((match) => {
                let id = match[2];
                let amount = match[5];
                let material = this.materials.find((material) => material.id == id);
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
        let mixedMaterials = this.extractMaterials(unfilteredData);
        this.materials = this.parseMaterials(mixedMaterials);
    }

    static extractMaterials(unfilteredData){
        let FGItemDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptor'")
        let FGResourceDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGResourceDescriptor'")
        let FGItemDescriptorBiomass = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptorBiomass'")
        let FGAmmoTypeProjectile = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeProjectile'")
        let FGItemDescriptorNuclearFuel = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGItemDescriptorNuclearFuel'")
        let FGConsumableDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGConsumableDescriptor'")
        let FGAmmoTypeSpreadshot = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeSpreadshot'")
        let FGAmmoTypeInstantHit = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGAmmoTypeInstantHit'")
        let FGEquipmentDescriptor = unfilteredData.filter((item) => item.NativeClass == "Class'/Script/FactoryGame.FGEquipmentDescriptor'")
        let mixedMaterials = FGItemDescriptor[0].Classes.concat(FGResourceDescriptor[0].Classes);
        mixedMaterials = mixedMaterials.concat(FGItemDescriptorBiomass[0].Classes)
        mixedMaterials = mixedMaterials.concat(FGAmmoTypeProjectile[0].Classes)
        mixedMaterials = mixedMaterials.concat(FGItemDescriptorNuclearFuel[0].Classes)
        mixedMaterials = mixedMaterials.concat(FGConsumableDescriptor[0].Classes)
        mixedMaterials = mixedMaterials.concat(FGAmmoTypeSpreadshot[0].Classes)
        mixedMaterials = mixedMaterials.concat(FGAmmoTypeInstantHit[0].Classes)
        mixedMaterials = mixedMaterials.concat(FGEquipmentDescriptor[0].Classes)
        return (mixedMaterials)
    }

    static parseMaterials(mixedMaterials){
        let materials = []
        mixedMaterials.forEach((mixedMaterial) => materials.push(new material(mixedMaterial.ClassName, mixedMaterial.mDisplayName, mixedMaterial.mForm)))
        return materials;
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