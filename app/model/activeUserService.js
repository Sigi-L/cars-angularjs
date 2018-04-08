
app.factory("activeUserService", function ($http, $log, $q) {
    function User(plainUser) {
        this.email = plainUser.email;
        this.password = plainUser.password;
        this.fname = plainUser.fname;
        this.lname = plainUser.lname;
    }

    var activeUser = null;

    // Loading all the users from JSON
    var users = [];


    function load() {
        var async = $q.defer();

        $http.get('app/data/users.json').then(
            function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    users.push(new User(response.data[i]));
                }

                async.resolve();
                // Testing
                //alert(users[1].lname); 
            }, function (response) {
                $log.error("error in getting user json: " + JSON.stringify(response));
                async.reject();
        });

        return async.promise;
    
    }


    // This function will update the active user property with the logged in user
    // Will return true in case of successfull login. otherwise return false
    function login(email, pwd) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].password === pwd) {
                activeUser = users[i];
                return true;
            }
        }

        return false;
    }
    
    function getUser() {
        return activeUser;
    }
    



    return {
        load: load,
        login: login,
        getUser: getUser
    }
})