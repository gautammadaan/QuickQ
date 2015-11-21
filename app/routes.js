var jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens

//==================================================================
// Models
//==================================================================
var User   = require('./models/user'); // get our mongoose model
//==================================================================
// controllers
//==================================================================
var userController = require('./controller/user')
    ,tagController = require('./controller/tag')
    ,quesController = require('./controller/question')
    ,feedbkController = require('./controller/feedback');

module.exports = function(app, express) {

    // ---------------------------------------------------------
    // authentication (no middleware necessary since this isnt authenticated)
    // ---------------------------------------------------------

    // http://localhost:8080/authenticate
    app.post('/authenticate', userController.signin);

    // facebook authentication
    app.post('/fb/authenticate', userController.fbSignin);

    app.post('/signup', userController.signup);

    // ---------------------------------------------------------
    // get an instance of the router for api routes
    // ---------------------------------------------------------
    var apiRoutes = express.Router();

    // ---------------------------------------------------------
    // route middleware to authenticate and check token
    // ---------------------------------------------------------
    apiRoutes.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {          
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });      
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;  
                    next();
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.'
            });
            
        }
        
    });

    // ---------------------------------------------------------
    // authenticated routes
    // ---------------------------------------------------------

    apiRoutes.get('/', function(req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    // Remove this, should never be exposed
    apiRoutes.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

    //*********** Tags *****************//

    apiRoutes.get('/tags', tagController.getTags);

    apiRoutes.get('/check', function(req, res) {
        res.json(req.decoded);
    });


    //*********** Questions *****************//
    // Ask question ========================
    apiRoutes.post('/question/ask', function(req, res) {
        quesController.askQuestion(req, res);
    });

    // Answer question ======================
    apiRoutes.post('/question/answer', function(req, res) {
        quesController.answerQuestion(req, res);
    });

    // Connect Two users
    apiRoutes.post('/question/connectUsers', function(req, res) {
        quesController.connect(req, res);
    });

    //****************** feedback ***************//
    // Send feedback for Questioner ========================
    apiRoutes.post('/feedback/questioner', function(req, res){
        feedbkController.sendFeebackQuestioner(req, res);
    })


    // Send feedback for respondent ========================
    apiRoutes.post('/feedback/respondent', function(req, res) {
        feedbkController.sendFeedbackRespondent(req, res);
    });

    // Get feedback scores ===================
    apiRoutes.post('/feedback/scores', function(req, res) {
        feedbkController.getScores(req, res);
    });

    app.use('/api', apiRoutes);
}