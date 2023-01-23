const fs = require('fs');
const path = require('path');

const recipes = require('../data/recipes.json');

const rootDir = require('../utils/path-helper');
const dataPath = path.join(rootDir, 'data', 'recipes.json');

module.exports = class Recipe {
    constructor(name, ingredient, instruction){
        this.id = recipes.length + 1;
        this.name = name;
        this.ingredient = ingredient;
        this.instruction = instruction;
    }
   
    setID(newId){
        this.id = newId;
    }


    save(callback) {
        fs.readFile(dataPath, "utf8", (err, data) => {
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 })
            }
    
            //Parse the JSON file
            const recipes = JSON.parse(data)
            recipes.push(this)
    
            //Write the new data to JSON file
            fs.writeFile(dataPath, JSON.stringify(recipes, null, 2),"utf8", (err) => {
                if(err){
                    callback({ message: "Could not write to recipe.json", status: 500 })
                }
                callback({ message: "Recipe saved successfully", status: 200 })
            })
        })
    }
    reedit(name, ingredient, instruction, id){
        this.id = id;
        this.name = name;
        this.ingredient = ingredient;
        this.instruction = instruction;
    }
    delete(callback){
        fs.readFile(dataPath, "utf8", (err, data) => {
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 })
            }
    
            //Parse the JSON file
            const recipes = JSON.parse(data)
            const newRecipes = recipes.filter(recipe => recipe.id != this.id) 
            
            
            fs.writeFile(dataPath, JSON.stringify(newRecipes, null, 2),"utf8", (err) => {
                if(err){
                    callback({ message: "Could not write to recipe.json", status: 500 })
                }
                callback({ message: "Recipe saved successfully", status: 200 })
            })
        })
    }
    edit(callback){
        fs.readFile(dataPath, "utf8", (err, data) => {
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 })
            }
    
            //Parse the JSON file
            const recipes = JSON.parse(data)
            const newRecipes = recipes.filter(recipe => recipe.id != this.id) 
            console.log(newRecipes);
            newRecipes.push(this)   
            
            fs.writeFile(dataPath, JSON.stringify(newRecipes, null, 2),"utf8", (err) => {
                if(err){
                    callback({ message: "Could not write to recipe.json", status: 500 })
                }
                callback({ message: "Recipe saved successfully", status: 200 })
            })
        })
    }


    static fetchAllRecipes(callback ){ 
        fs.readFile(dataPath, (err, data) => {
            if(err){
                callback({ message: "Could not read recipe.json", status: 500 })
            }
            callback(JSON.parse(data))
        })
    }

    static findById(id){
        const recipes = JSON.parse(fs.readFileSync(dataPath))
        const found = recipes.some(recipe => recipe.id === parseInt(id))

        if(!found){
            return { message: "Recipe not found", status: 404 }
        }

        return recipes.find(recipe => recipe.id === parseInt(id))
    }
    
}