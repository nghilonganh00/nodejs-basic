import pool from "../configs/connectDB" 

let getAllUsers = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM USER')
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    let createNewUser = async (req, res) => {
        let {firstName, lastName, email, address} = req.body;

        if(!firstName || !lastName || !email || !address) {
            return res.status(200).json({
                message: "missing required params"
            })
        }
        await pool.execute('insert into user(firstName, lastName, email, address) values (?, ?, ?, ?)',
            [firstName, lastName, email, address]);
        return res.redirect('/')
    }

    return res.status(200).json({
        message: "ok"
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body; 
    await pool.execute('update user set firstName= ?, lastName= ?, email= ?, address= ? where id= ?',
        [firstName, lastName, email, address, id])

    if(!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "missing required params"
        })
    }

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteUser = async (req, res) => {
    let userId = req.params.id;

    if(!userId) {
        return res.status(200).json({
            message: "missing required params"
        })
    }
    
    await pool.execute('delete from user where id = ?', [userId])

    return res.status(200).json({
        message: 'ok'
    })
}
module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}