import pool from "../configs/connectDB";
import multer from "multer";

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

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from user where id = ?', [userId])
    return res.redirect('/')
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('select * from user where id = ?', [id]);
    console.log(user[0]);
    return res.render('update.ejs', { dataUser: user[0] });
}

let postUpdateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body; 
    await pool.execute('update user set firstName= ?, lastName= ?, email= ?, address= ? where id= ?',
        [firstName, lastName, email, address, id])
    return res.redirect('/')
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

const upload = multer().single('profile_pic');

let handleUploadFile = async(req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }
        // Display uploaded image for user validation
        return res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

module.exports = {
    getHomePage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, 
    getUploadFilePage, handleUploadFile
}