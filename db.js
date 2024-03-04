import conn from './conn.js'


export async function getAllPosts() {
  try {
    const [rows] = await conn.query('SELECT * FROM blog_posts');
    return rows;
  } catch (error) {
    throw new Error('Error fetching blog_posts: ' + error.message);
  }
}


export async function getPost(id) {
    const [rows] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    return rows[0];
  }
  
  
 export async function createPost(name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64) {
    const [result] = await conn.query('INSERT INTO blog_posts(name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name_circuit, country_circuit, name_winner, team, date, year, time_fastest_lap, highlights, image_base64])
    return result
    
}


export async function updatePost(id, changedData) {
    const [result] = await conn.query('UPDATE blog_posts SET ? WHERE id = ?', [changedData, id]);
    return result;
}
  
  export async function deletePost(id) {
    const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    return result; 
  }