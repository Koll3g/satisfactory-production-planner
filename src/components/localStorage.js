const localStorageVersion = "v2"

export function saveToLocalStorage(productionSteps, groups){
    //WHEN MAKING CHANGES CONSIDER INCREASING VERSION!!
    let storageItem = { version: localStorageVersion, productionSteps: productionSteps, groups: groups }    
    let key = "PRODUCTION_PLAN_1"
    let stringified = JSON.stringify(storageItem)
    localStorage.setItem(key, stringified);
}

export function getFromLocalStorage() {
    //WHEN MAKING CHANGES CONSIDER INCREASING VERSION!!
    let key = "PRODUCTION_PLAN_1"
    let data = JSON.parse(localStorage.getItem(key))

    console.log("loading data: ", data)

    if(data.version == null){
        data = {version: "v1", productionSteps: data}
        console.log("converted data to v1: ", data)
    }
    if(data.version == "v1"){
        data.version = "v2"
        data.groups = []
        console.log("converted data to v2: ", data)
    }

    return data
}