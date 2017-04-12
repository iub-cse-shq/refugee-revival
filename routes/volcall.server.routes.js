module.exports = function(app){

 var volcall = require('./../controllers/volcall.server.controller.js');  // 
 var users = require('./../controllers/users.server.controller.js'); // 

// 9:25 run based on controllers.. passing the files on the controllers

//API routes
 app.route('/api/volcall') 
	.get(volcall.list) // shows list of product 
	.post(users.requiresLogin, volcall.create); // 10:02 make sure verification happened from client side: (goto controller)

 app.route('/api/volcall/:postId')
	.get(volcall.read)
 .delete(users.requiresLogin, volcall.delete);

	app.route('/api/volcall/edit/:postId')
	.get(volcall.read)
	.put(users.requiresLogin, volcall.update);

//Routes to render views
 app.route('/volcall/new').get(volcall.new);
  
  // 9:13 added in class 
 app.route('/volcall/all').get(volcall.all);
 app.route('/volcall/edit/:postId').get(volcall.edit);
 app.route('/volcall/view').get(volcall.view);    // 9:14 miss called this view 


app.param('postId', volcall.postByID);

}
