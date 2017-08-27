module.exports = function (req, res) {

  console.log(req.isaura.lists);
  
  res.render('index', { title: 'Isaura' , lists: req.isaura.lists});  
}