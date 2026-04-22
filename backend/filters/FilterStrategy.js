class FilterStrategy {
  apply(items, criteria) {
    throw new Error('apply() must be implemented');
  }
}

class TagFilter extends FilterStrategy {
  apply(recipes, tag) {
    if (!tag) return recipes;
    return recipes.filter(recipe => recipe.tags && recipe.tags.includes(tag));
  }
}

class CategoryFilter extends FilterStrategy {
  apply(recipes, category) {
    if (!category) return recipes;
    return recipes.filter(recipe => recipe.category === category);
  }
}

module.exports = { TagFilter, CategoryFilter };