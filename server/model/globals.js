class Globals{
    static get AUTH_ERROR(){return 4000};
    static get DB_INSERTION(){return 5100};
    static get DB_DELETION(){return 5200};
    static get DB_SELECTION(){return 5300};
    static get SUCCESS(){return 2000};
    static get JWTSECRET(){return 'my_jwt_secret'};
}
module.exports=Globals;