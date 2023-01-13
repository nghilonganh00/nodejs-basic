import pool from "../configs/connectDB";
 
let getHomePage = async (req, res) => {
    const [row, fields] = await pool.execute('SELECT * FROM `user`');
    return res.render('index.ejs', {dataUser: row})
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from user where id = ?`, [userId]);
    return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
    let {firstName, lastName, email, address} = req.body;

    await pool.execute('insert into user(firstName, lastName, email, address) values (?, ?, ?, ?)',
    [firstName, lastName, email, address]);
    
    return res.redirect('/')
}

module.exports = {
    getHomePage, getDetailPage, createNewUser
}