const pool = require("../db");

class PostService {
  async getAll(userId) {
    // TODO:Get posts by page and get totalCount of them

    const totalCounts = "TODO:GET COUNTS OF ALL POSTS FOR PAGINATION";
    const page = "TODO:HOW TO MAKE GETTING BY PAGE";
    // TODO: Make logic of likes such as:
    // - got post from DB
    // - check if post includes id from req.user(that is got from header authorization)
    //    in field likes by binary search(?)
    // v if includes id (post is liked by user)return in field likes only one user's id
    //    and return quantity of likes as second element of array OR just make field likes
    //    object that contains field isLiked true if user liked post and field {likesQty}
    // x if does not includes id - return only {likesQty}
    const allPosts = await pool.query(`SELECT * FROM posts ORDER BY id DESC;`);
    const posts = allPosts.rows.map((post) => {
      const isLikedByUser = post.likes.includes(userId);
      if (isLikedByUser) {
        const likedPost = {
          ...post,
          isLiked: true,
          likesQty: post.likes.length,
        };
        delete likedPost.likes;
        return likedPost;
      } else {
        const likedPost = { ...post, likesQty: post.likes.length };
        delete likedPost.likes;
        return likedPost;
      }
    });
    return posts;
  }
  async createPost(post) {
    const { title, content, created_by, created_at, likes, caption } = post;
    const createdPost = await pool.query(
      `INSERT INTO posts (title,content, created_by,created_at, likes,caption) values ($1,$2,$3,$4, $5,$6) RETURNING*;`,
      [title, content, created_by, created_at, likes, caption]
    );
    return {
      id: createdPost.rows[0].id,
      message: `Post successfully added`,
      status: "ok",
    };
  }
  async deletePost(id) {
    const deletedPost = await pool.query(
      `DELETE FROM posts WHERE id = $1 RETURNING*;`,
      [id]
    );
    return deletedPost.rows[0];
  }
  async toggleLikeOnPost(id, userId) {
    const post = await pool.query(`SELECT * FROM posts WHERE id = $1;`, [id]);
    if (post.rows[0] && post.rows[0].likes.includes(userId)) {
      const unlikedPost = post.rows[0].likes.filter((id) => id !== userId);
      const likedPost = await pool.query(
        `UPDATE posts SET likes = $1 WHERE id = $2 RETURNING*;`,
        [unlikedPost, id]
      );
      return likedPost.rows[0];
    }
    const likedPost = await pool.query(
      `UPDATE posts SET likes = array_append(likes,$1) WHERE id = $2 RETURNING*;`,
      [userId, id]
    );
    return likedPost.rows;
  }
  async getOnePost(postId, userId) {
    const postData = await pool.query(`SELECT * FROM posts WHERE id = $1`, [
      postId,
    ]);
    const postCreator = await pool.query(
      `SELECT id FROM users WHERE username = $1`,
      [postData.rows[0].created_by]
    );
    const postComments = await pool.query(
      `SELECT * FROM post_comments WHERE post_id = $1 ORDER BY id DESC`,
      [postData.rows[0].id]
    );
    const post = {
      ...postData.rows[0],
      likesQty: postData.rows[0].likes.length,
      userId: postCreator.rows[0].id,
      comments: postComments.rows.map((comment) => {
        const updatedComment = {
          ...comment,
          createdBy: comment.created_by,
          postId: comment.post_id,
        };
        delete updatedComment.created_at;
        delete updatedComment.post_id;
        return updatedComment;
      }),
    };

    const isLikedByUser = post.likes.includes(userId);
    if (isLikedByUser) {
      const likedPost = { ...post, isLiked: true };
      delete likedPost.likes;
      return likedPost;
    } else {
      const likedPost = { ...post, isLiked: false };
      delete likedPost.likes;
      return likedPost;
    }
  }
  async addComment(post) {
    const { postId, createdAt, text, createdBy } = post;
    const addedComment = await pool.query(
      `INSERT INTO post_comments (post_id,created_by,created_at, text) values ($1,$2,$3,$4) RETURNING*;`,
      [postId, createdBy, createdAt, text]
    );
    return addedComment.rows[0];
  }
}

module.exports = new PostService();
