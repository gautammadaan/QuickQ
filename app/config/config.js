var ids = {
    facebook: {
        api: "https://graph.facebook.com/v2.4",
        clientID: '1705290623083080',
        clientSecret: 'b830086eacdae18e1b8e3826f973fb2d',
        accessToken: '1759327447627774|A90ZLJpsjRB09kPLoBOfnhuboqc',
        callbackURL: 'http://127.0.0.1:8080/auth/facebook/callback'
    }
};

var aws = {

    "accessKeyId": "akid",
    "secretAccessKey": "secret",
    "region": "us-east-1"

};

var database = {

    'secret': 'ilovescotchyscotch',
    'database': 'mongodb://localhost:27017/quickq'

}

module.exports = {
    ids: ids,
    aws: aws,
    database: database
};