const express = require('express');
const fs = require('fs');
const path = require('path');
const PostFactory = require('./backend/factories/PostFactory');
const { TagFilter, CategoryFilter } = require('./backend/filters/FilterStrategy');
const { Comment, CommentThread } = require('./backend/models/CommentComponent');

const app = express();
app.use(express.json());

// API ROUTES (must come before static files)
const RECIPES_FILE = path.join(__dirname, 'data', 'recipes.json');
const COMMENTS_FILE = path.join(__dirname, 'data', 'comments.json');

function readRecipes() {
  if (!fs.existsSync(RECIPES_FILE)) return [];
  return JSON.parse(fs.readFileSync(RECIPES_FILE, 'utf8'));
}
function writeRecipes(recipes) {
  fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
}
function readComments() {
  if (!fs.existsSync(COMMENTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(COMMENTS_FILE, 'utf8'));
}
function writeComments(comments) {
  fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

// Recipes CRUD
app.get('/api/recipes', (req, res) => {
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
});

app.get('/api/recipes/:id', (req, res) => {
  const recipes = readRecipes();
  const recipe = recipes.find(r => r.id == req.params.id);
  if (!recipe) return res.status(404).json({ error: 'Not found' });
  res.json(recipe);
});

app.post('/api/recipes', (req, res) => {
  const recipes = readRecipes();
  const newRecipe = PostFactory.createPost('recipe', req.body);
  const newId = Date.now().toString();
  const recipeObj = {
    id: newId,
    title: newRecipe.title,
    content: newRecipe.content,
    ingredients: newRecipe.ingredients,
    category: newRecipe.category,
    createdAt: new Date().toISOString()
  };
  recipes.push(recipeObj);
  writeRecipes(recipes);
  res.status(201).json(recipeObj);
});

app.put('/api/recipes/:id', (req, res) => {
  const recipes = readRecipes();
  const index = recipes.findIndex(r => r.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  recipes[index] = { ...recipes[index], ...req.body, id: req.params.id };
  writeRecipes(recipes);
  res.json(recipes[index]);
});

app.delete('/api/recipes/:id', (req, res) => {
  let recipes = readRecipes();
  recipes = recipes.filter(r => r.id != req.params.id);
  writeRecipes(recipes);
  res.status(204).send();
});

// Comments (Composite)
app.get('/api/comments/:recipeId', (req, res) => {
  const comments = readComments();
  const recipeComments = comments.filter(c => c.recipeId == req.params.recipeId);
  const buildTree = (parentId) => {
    const children = recipeComments.filter(c => c.parentId === parentId);
    return children.map(c => {
      const commentNode = new Comment(c.author, c.text, c.id);
      const replies = buildTree(c.id);
      replies.forEach(reply => commentNode.addReply(reply));
      return commentNode;
    });
  };
  const threads = buildTree(null);
  const toJSON = (node) => ({ id: node.id, author: node.author, text: node.text, replies: node.replies.map(toJSON) });
  res.json(threads.map(toJSON));
});

app.post('/api/comments', (req, res) => {
  const { recipeId, author, text, parentId } = req.body;
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
});

// STATIC FILES (after API routes)
app.use(express.static('frontend'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:3000`));