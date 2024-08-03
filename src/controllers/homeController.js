import db from '../models/index'
import CRUDServices from '../services/CRUDServices';
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let massage = await CRUDServices.createNewUser(req.body);
    console.log(massage)
    return res.send('post crud');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDServices.getAllUser();
    console.log(data)
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDServices.getUserInfoById(userId);
        return res.send('ok');
    }
    else {
        return res.send('Users not found!');
    }


}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
};
