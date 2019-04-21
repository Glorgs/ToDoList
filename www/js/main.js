var demoApp = angular.module('TodoApp', ['ngCookies']);

demoApp.controller('MainController', function ($scope, $http, $cookies) {
    $scope.updateData = {};
    $scope.name = {};
    $scope.LesTaches = {};
    $scope.list = {};
    $scope.password = {};
    $scope.user = {};
    $scope.ListeTask = {};

    if ($cookies.user != null) {
        $http.get('https://murmuring-forest-93836.herokuapp.com//getListTask').then(function (resp) {
            var a = [];
            for (var i = 0; i < resp.data.length; i++) {
                if (resp.data[i].username == $cookies.user) {
                    a.push(resp.data[i]);
                }
            }
            $scope.LesTaches = a;
            
            $scope.ListeTask.valeur = new Array($scope.LesTaches.length);
            for (var i = 0; i < $scope.LesTaches.length; i++) {
                var req = {
                    identifiant: $scope.LesTaches[i]._id,
                    boucle: i
                };
                
                $http.post('https://murmuring-forest-93836.herokuapp.com//getTaskSet', req).then(function (resp) {
                    var value = [];
                    for (var j = 0; j < resp.data.r.length; j++) {
                        value.push(resp.data.r[j]);
                    }
                    console.log(value)
                    $scope.ListeTask.valeur[resp.data.indice]=(value);
                });
                
            }
        });
    } else {
        document.location.href = "./connexion.html";
    }

    $scope.createTodo = function (id, index) {
        if ($scope.name.text != null) {
            var req = {
                identifiant: id,
                name: $scope.name.text
            };

            $http.post('https://murmuring-forest-93836.herokuapp.com//addTask', req)
                .success(function (data) {
                    $scope.req = {};
                    $scope.name = {};
                    $scope.ListeTask.valeur[index] = data;
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        } else {
            window.alert("Rentrez un nom de tache");
        }



    };

    $scope.deleteTodo = function (id, index, listeid) {
        console.log(index);
        var req = {
            identifiant: id,
            liste_id: listeid
        };
        $http.post('https://murmuring-forest-93836.herokuapp.com//deleteTask', req)
            .success(function (data) {
                $scope.ListeTask.valeur[index] = data;

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateToDo = function (id, index, listeid) {
        $scope.updateData.identifiant = id;
        $scope.updateData.listeid = listeid;

        $http.post('https://murmuring-forest-93836.herokuapp.com//updateTask', $scope.updateData).success(function (data) {

            $scope.updateData = {};
            $scope.ListeTask.valeur[index] = data;
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.isSelect = function (id, done, index, listeid) {
        $scope.updateData.identifiant = id;
        $scope.updateData.done = !done;
        $scope.updateData.listeid = listeid;
        $http.post('https://murmuring-forest-93836.herokuapp.com//updateDone', $scope.updateData).success(function (data) {

            $scope.updateData = {};
            $scope.ListeTask.valeur[index] = data;
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    };

    $scope.deleteAll = function (id) {
        var todo = $scope.ListeTask.valeur[id]
        for (var i = 0; i < todo.length; i++) {
            if (todo[i].done) {
                var req = {
                    identifiant: todo[i]._id,
                    liste_id: todo[i].liste_id
                };
                $http.post('https://murmuring-forest-93836.herokuapp.com//deleteTask', req)
                    .success(function (data) {
                        $scope.ListeTask.valeur[id] = data;
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        }
    };

    $scope.deleteList = function (id, index) {
    


        var req = {
            identifiant_li: id
        };
        $http.post('https://murmuring-forest-93836.herokuapp.com//deleteList', req).success(function (data) {
            var a = [];
            for (var i = 0; i < data.length; i++) {
                if (data[i].username == $cookies.user) {
                    a.push(data[i]);
                }
            }
            $scope.LesTaches = a;
        })
            .error(function (data) {
                console.log('Error: ' + data);
            });

            console.log($scope.ListeTask.valeur)

            if($scope.ListeTask.valeur.length>0){
                var tmp = $scope.ListeTask.valeur[index];
                for (var i = 0; i < tmp.length; i++) {
                    var req = {
                        identifiant: tmp[i]._id,
                        liste_id: id
                    };
                    console.log(req.identifiant)
                    $http.post('https://murmuring-forest-93836.herokuapp.com//deleteTask', req)
                        .success(function (data) {
                            $scope.ListeTask.valeur[index] = data;
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                }
            }

        $http.get('https://murmuring-forest-93836.herokuapp.com//getListTask').then(function (resp) {
            var a = [];
            for (var i = 0; i < resp.data.length; i++) {
                if (resp.data[i].username == $cookies.user) {
                    a.push(resp.data[i]);
                }
            }
            $scope.LesTaches = a;
            
            $scope.ListeTask.valeur = new Array($scope.LesTaches.length);
            for (var i = 0; i < $scope.LesTaches.length; i++) {
                var req = {
                    identifiant: $scope.LesTaches[i]._id,
                    boucle: i
                };
                
                $http.post('https://murmuring-forest-93836.herokuapp.com//getTaskSet', req).then(function (resp) {
                    var value = [];
                    for (var j = 0; j < resp.data.r.length; j++) {
                        value.push(resp.data.r[j]);
                    }
                    console.log(value)
                    $scope.ListeTask.valeur[resp.data.indice]=(value);
                });
                
            }
        });

        

    };


    $scope.createList = function () {
        if ($scope.list.text != null) {
            var req = {
                nom_List: $scope.list.text,
                username: $cookies.user
            };
            $http.post('https://murmuring-forest-93836.herokuapp.com//addList', req).success(function (data) {
                var a = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].username == $cookies.user) {
                        a.push(data[i]);
                    }
                }
                $scope.LesTaches = a;
            })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        } else {
            window.alert("Rentrez un nom de liste");
        }

    };

    $scope.deconnexion = function () {
        delete $cookies['user'];
        document.location.href = "./connexion.html";
    };

});


var connexionApp = angular.module('Connexion', ['ngCookies']);
connexionApp.controller('ConnexionController', function ($scope, $http, $cookies) {
    $scope.password = {};
    $scope.user = {};
    console.log($cookies);
    $scope.connexion = function () {
        var req = {
            user: $scope.user.text,
            passwrd: $scope.password.text
        };
        $http.post('https://murmuring-forest-93836.herokuapp.com//connexion', req).then(function (resp) {
            if (resp.data.length > 0) {
                $cookies.user = resp.data[0].username;
                document.location.href = "./index.html";
            }
            else {
                window.alert("Identifiant ou mot de passe incorrect");
            }
            $scope.password = {};
            $scope.user = {};
        });
    };

    $scope.inscription_dir = function () {
        document.location.href = "./inscription.html";
    };

    $scope.inscription = function () {
        var req = {
            user: $scope.user.text,
            passwrd: $scope.password.text
        };

        $http.post('https://murmuring-forest-93836.herokuapp.com//verif', req).then(function (resp) {
            if (resp.data.length == 0) {
                $http.post('https://murmuring-forest-93836.herokuapp.com//inscription', req).then(function (resp) {
                    document.location.href = "./connexion.html";
                    window.alert("Bravo inscription réussie vous pouvez vous connecter");
                });
            } else {
                window.alert("Le nom d'utilisateur existe déjà");
            }
        });
    };
});