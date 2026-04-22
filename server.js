const express = require('express');
const fs = require('fs');
const path = require('path');
const PostFactory = require('./backend/factories/PostFactory');
const { TagFilter, CategoryFilter } = require('./backend/filters/FilterStrategy');

const app = express();
app.use(express.json());

const RECIPES_FILE = path.join(__dirname, 'data', 'recipes.json');
const COMMENTS_FILE = path.join(__dirname, 'data', 'comments.json');

// Helper functions
function readRecipes() {
  if (!fs.existsSync(RECIPES_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
  } catch(e) { return []; }
}
function writeRecipes(recipes) {
  fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
}
function readComments() {
  if (!fs.existsSync(COMMENTS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
  } catch(e) { return []; }
}
function writeComments(comments) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// Recipes CRUD
app.get('/api/recipes', (req, res) => {
  try {
    let recipes = readRecipes();
    const filterType = req.query.filterBy;
    const filterValue = req.query.value;
    if (filterType && filterValue) {
      let strategy;
      if (filterType === 'tag') strategy = new TagFilter();
      else if (filterType === 'category') strategy = new CategoryFilter();
      else return res.status(400).json({ error: 'Unknown filter' });
      recipes = strategy.apply(recipes, filterValue);
    }
    res.json(recipes);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/recipes/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const recipe = recipes.find(r => r.id == req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Not found' });
    res.json(recipe);
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/recipes', (req, res) => {
  try {
    const recipes = readRecipes();
    const newRecipe = PostFactory.createPost('recipe', req.body);
    const newId = Date.now().toString();
    const recipeObj = {
      id: newId,
      title: newRecipe.title,
      content: newRecipe.content,
      ingredients: newRecipe.ingredients || [],
      category: newRecipe.category,
      image: newRecipe.image || null,
      createdAt: new Date().toISOString()
    };
    recipes.push(recipeObj);
    writeRecipes(recipes);
    res.status(201).json(recipeObj);
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/recipes/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const index = recipes.findIndex(r => r.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Not found' });
    recipes[index] = { ...recipes[index], ...req.body, id: req.params.id };
    writeRecipes(recipes);
    res.json(recipes[index]);
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/recipes/:id', (req, res) => {
  try {
    let recipes = readRecipes();
    recipes = recipes.filter(r => r.id != req.params.id);
    writeRecipes(recipes);
    res.status(204).send();
  } catch(err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Comments - returns nested JSON for Composite pattern on frontend
app.get('/api/comments/:recipeId', (req, res) => {
  try {
    const comments = readComments();
    const recipeComments = comments.filter(c => c.recipeId == req.params.recipeId);
    // Recursive function to build comment tree
    const buildTree = (parentId) => {
      const children = recipeComments.filter(c => c.parentId === parentId);
      return children.map(c => ({
        id: c.id,
        author: c.author,
        text: c.text,
        replies: buildTree(c.id)
      }));
    };
    const threads = buildTree(null);
    res.json(threads);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/comments', (req, res) => {
  try {
    const { recipeId, author, text, parentId } = req.body;
    if (!recipeId || !author || !text) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const newComment = {
      id: Date.now().toString(),
      recipeId,
      author,
      text,
      parentId: parentId || null,
      createdAt: new Date().toISOString()
    };
    const comments = readComments();
    comments.push(newComment);
    writeComments(comments);
    res.status(201).json(newComment);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static frontend files
app.use(express.static('frontend'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));