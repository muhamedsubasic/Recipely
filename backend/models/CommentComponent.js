// Component interface (implicit via duck typing)
class CommentComponent {
  render() {
    throw new Error('render() must be implemented');
  }
}

// Leaf: a single comment
class Comment extends CommentComponent {
  constructor(author, text, id = null) {
    super();
    this.id = id || Date.now().toString();
    this.author = author;
    this.text = text;
    this.replies = [];
  }

  addReply(reply) {
    this.replies.push(reply);
  }

  render() {
    let html = `<div class="comment" data-id="${this.id}">
                  <strong>${this.author}</strong>: ${this.text}`;
    if (this.replies.length > 0) {
      html += `<div class="replies" style="margin-left: 20px;">`;
      html += this.replies.map(reply => reply.render()).join('');
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  }
}

// Composite: a thread (optional, can just use Comment with replies)
class CommentThread extends CommentComponent {
  constructor() {
    super();
    this.comments = [];
  }
  addComment(comment) {
    this.comments.push(comment);
  }
  render() {
    return this.comments.map(c => c.render()).join('');
  }
}

module.exports = { Comment, CommentThread };