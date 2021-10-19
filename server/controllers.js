const bcrypt = require('bcrypt');

module.exports = {
    getUser: async (req, res) => {
        const db = req.app.get('db')
        let get_user;
        try {
            get_user = await db.get_user([req.params.name]) 
            if(get_user.length === 0) {
                res.statusMessage = "Username does not exist"
                res.status(400).send(res.statusMessage)
            } else {
                const passConf = bcrypt.compareSync(req.params.pass, get_user[0].password)
                if(!passConf) {
                    res.statusMessage = "Password is incorrect"
                    res.status(401).send(res.statusMessage)
                } else {
                    res.status(200).send(get_user)
                }
            }
            
        } catch (err) {
            console.log(err)
        }
            
    },
    signUp: async (req, res) => {
        let {email, username, password} = req.body.newUser
        const db= req.app.get('db')
        try {
            const get_new_user = await db.get_new_user([email])
            if(get_new_user.length > 0) {
                res.statusMessage = "Email is already registered"
                res.status(400).send(res.statusMessage)
            }
            let get_user = await db.get_user([username])
            if(get_user.length > 0) {
                res.statusMessage = "Username is taken"
                res.status(400).send(res.statusMessage)
            }
            
            const salt = bcrypt.genSaltSync(10);
            const passHash = bcrypt.hashSync(password, salt);
            await db.create_user([email, username, passHash])
            get_user = await db.get_user([username])
            res.status(200).send(get_user)
        } catch (err) {
            console.log(err)
        }
    },
    getLists: async (req, res) => {
        const db = req.app.get('db')
        const get_lists = await db.get_lists([+req.params.id])
        res.status(200).send(get_lists)
    },
    addList: async (req, res) => {
        const db = req.app.get('db')
        await db.add_list([+req.params.id, req.body.name])
        res.status(200).send("List added")
    },
    updateList: async (req, res) => {
        const db = req.app.get('db')
        await db.update_list([req.body.name, +req.params.id])
        res.status(200).send("List updated")
    },
    deleteList: async (req, res) => {
        const db = req.app.get('db')
        await db.delete_list([+req.params.id])
        res.status(200).send("List deleted")
    },
    getItems: async (req, res) => {
        const db = req.app.get('db')
        const get_items = await db.get_items([+req.params.id]) 
        res.status(200).send(get_items)
    },
    addItem: async (req, res) => {
        const db = req.app.get('db')
        await db.add_item([+req.params.id, req.body.name])
        res.status(200).send("Item added")
    },
    updateItem: async (req, res) => {
        const db = req.app.get('db')
        await db.update_item([req.body.name, +req.params.id])
        res.status(200).send("Item updated")
    },
    deleteItem: async (req, res) => {
        const db = req.app.get('db')
        await db.delete_item([+req.params.id])
        res.status(200).send("Item deleted")
    }
}