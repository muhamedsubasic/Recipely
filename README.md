# Recipely

## Patterns Applied

### Creational – Factory Method
**Files:** `backend/factories/PostFactory.js`, `backend/models/RecipePost.js`, `backend/models/PagePost.js`  
**Problem solved:** WordPress scatters `new WP_Post` everywhere, making it hard to add new post types. Our factory centralizes creation. Adding a `VideoPost` requires one new class and one case in the factory – no changes to controllers or routes.

### Structural – Composite
**Files:** `backend/models/CommentComponent.js` (Comment, CommentThread)  
**Problem solved:** WordPress handles nested comments with messy recursion and separate rendering. Our Composite gives a uniform `render()` method for a single comment or a whole thread. The frontend recursively renders replies using the same interface.

### Behavioral – Strategy
**Files:** `backend/filters/FilterStrategy.js`, `TagFilter`, `CategoryFilter`  
**Problem solved:** WordPress filters posts with long `if/else` or `switch` blocks. Our Strategy encapsulates each filter algorithm in its own class. Adding a `DateRangeFilter` requires zero changes to existing code – just a new class.