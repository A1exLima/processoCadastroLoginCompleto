module.exports = {

    registration: (req, res) =>{

        res.render('userRegister.ejs');
    },

    processRegistration: (req, res) =>{

        res.send('Imagem enviada com sucesso');
    } 
}