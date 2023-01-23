const express = require('express');

const {getRecipesPage, getAddRecipePage, postAddRecipe, getRecipeById, postEditRecipesPage, postEditRecipes , postEditDeleteRecipes } = require('../controller/recipe.controller')

const router = express.Router();

/**
 * @route GET //localhost:8000/recipes/
 * @desc Get all recipes
 */
router.get('/', getRecipesPage)
router.post('/', postEditRecipesPage) 

/**
 * @route POST //localhost:8000/recipes/save
 * @desc Save a recipe
 */
router.post('/save', postAddRecipe)

/**
 * @route GET //localhost:8000/recipes/create
 * @desc Get the create recipe form
 */
router.get('/create', getAddRecipePage)

/**
 * @route GET //localhost:8000/recipes/edit
 * @desc Get the recepies and edit 
 */
router.post('/edit', postEditRecipes)
router.post('/edit/delete', postEditDeleteRecipes)


/**
 * @route GET //localhost:8000/recipes/:id
 * @desc Get a single recipe by id
**/
router.get('/:id', getRecipeById)

module.exports = router;