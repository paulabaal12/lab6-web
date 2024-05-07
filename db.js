import conn from './conn.js';

export async function getAllPosts() {
  try {
    const [rows] = await conn.query('SELECT * FROM blog_posts');
    return rows;
  } catch (error) {
    throw new Error('Error fetching blog_posts: ' + error.message);
  }
}

export async function getPost(id) {
  try {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching blog_post with id ' + id + ': ' + error.message);
  }
}

export async function createPost(name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64) {
  try {
    const [result] = await conn.query('INSERT INTO blog_posts(name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64]);
    return result;
  } catch (error) {
    throw new Error('Error creating blog_post: ' + error.message);
  }
}

export async function updatePost(id, changedData) {
  try {
    const [result] = await conn.query('UPDATE blog_posts SET ? WHERE id = ?', [changedData, id]);
    return result;
  } catch (error) {
    throw new Error('Error updating blog_post with id ' + id + ': ' + error.message);
  }
}

export async function deletePost(id) {
  try {
    const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    return result;
  } catch (error) {
    throw new Error('Error deleting blog_post with id ' + id + ': ' + error.message);
  }
}


export async function getAllUsers() {
  try {
    const [rows] = await conn.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

export async function getUser(id) {
  try {
    const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching user with id ' + id + ': ' + error.message);
  }
}

export async function createUser(username, password, name) {
  try {
    const [result] = await conn.query('INSERT INTO users (username, password, name) VALUES (?, ?, ?)', [username, password, name]);
    return result;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}

export async function updateUser(id, changedData) {
  try {
    const [result] = await conn.query('UPDATE users SET ? WHERE id = ?', [changedData, id]);
    return result;
  } catch (error) {
    throw new Error('Error updating user with id ' + id + ': ' + error.message);
  }
}

export async function deleteUser(id) {
  try {
    const [result] = await conn.query('DELETE FROM users WHERE id = ?', [id]);
    return result;
  } catch (error) {
    throw new Error('Error deleting user with id ' + id + ': ' + error.message);
  }
}
