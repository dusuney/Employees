(function(ng) {
    ng.module('employees', [
        'ngRoute',
        'employees.employeeCart',
        'employees.departmentsList',
        'employees.employeesList'
    ]);

    ng.module('employees')
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {


            $routeProvider.otherwise({
                redirectTo: '/departments'
            });

            $routeProvider
                .when('/departments', {
                    templateUrl: '/scripts/departmentsList/index.html',
                    controller: 'departmentsListCtrl'
                })
                .when('/departments/:departmentId/employees', {
                    templateUrl: '/scripts/employeesList/index.html',
                    controller: 'employeesListCtrl'
                })
                .when('/employees/:employeeId', {
                    templateUrl: '/scripts/employeeCart/index.html',
                    controller: 'employeeCartCtrl'
                });

        }]);


    // ng.module('employees')
    //     .config(DepartmentsConfig);
    //
    // DepartmentsConfig.inject = ['$routeProvider'];
    //
    // function DepartmentsConfig($routeProvider) {
    //
    //
    // }
})(angular);
