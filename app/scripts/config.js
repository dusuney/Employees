(function(ng) {

    ng.module('employees')
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {


            $routeProvider.otherwise({
                redirectTo: '/departments'
            });

            $routeProvider
                .when('/departments', {
                    templateUrl: 'pages/departmentsList/index.html',
                    controller: 'departmentsListCtrl'
                })
                .when('/departments/:departmentId/employees', {
                    templateUrl: 'pages/employeesList/index.html',
                    controller: 'employeesListCtrl'
                })
                .when('/employees/:employeeId', {
                    templateUrl: 'pages/employeeCart/index.html',
                    controller: 'employeeCartCtrl'
                });


        }]);

})(angular);
