class RecipePost {
  constructor(title, content, ingredients, category, image = null) {
    this.title = title;
    this.content = content;
    this.ingredients = ingredients || [];
    this.category = category || 'general';
    this.image = image; // URL to an image (optional)
  }
}

module.exports = RecipePost;