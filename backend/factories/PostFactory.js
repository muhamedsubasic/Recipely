const RecipePost = require('../models/RecipePost');
const PagePost = require('../models/PagePost');

class PostFactory {
  static createPost(type, data) {
    switch (type) {
      case 'recipe':
        return new RecipePost(data.title, data.content, data.ingredients, data.category);
      case 'page':
        return new PagePost(data.title, data.content);
      default:
        throw new Error(`Unknown post type: ${type}`);
    }
  }
}

module.exports = PostFactory;