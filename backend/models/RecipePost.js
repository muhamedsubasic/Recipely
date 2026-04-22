class RecipePost {
  constructor(title, content, ingredients, category) {
    this.title = title;
    this.content = content;
    this.ingredients = ingredients || [];
    this.category = category || 'general';
  }
}

module.exports = RecipePost;