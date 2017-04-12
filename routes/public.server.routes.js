module.exports = function(app){

 var public = require('./../controllers/public.server.controller.js');  // 
 var users = require('./../controllers/users.server.controller.js'); // 

// 9:25 run based on controllers.. passing the files on the controllers

//API routes
 app.route('/api/public') 
	.get(public.list) // shows list of product 
	.post(users.requiresLogin, public.create); // 10:02 make sure verification happened from client side: (goto controller)

 app.route('/api/public/:postId')
	.get(public.read)
 .delete(users.requiresLogin, public.delete);

	app.route('/api/public/edit/:postId')
	.get(public.read)
	.put(users.requiresLogin, public.update);

//Routes to render views
 app.route('/public/new').get(public.new);
  
  // 9:13 added in class 
 app.route('/public/all').get(public.all);
 app.route('/public/edit/:publicId').get(public.edit);
 app.route('/public/view').get(public.view);    // 9:14 miss called this view 


app.param('publicId', public.publicByID);

}
