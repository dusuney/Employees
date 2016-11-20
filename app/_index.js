(function(ng) {
    ng.module('employees', [
        'ngRoute',
        'employees.departments',
        'employees.employee',
        'employees.employees'
    ]);

    ng.module('employees')
        .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
            //$locationProvider.hashPrefix('!');

            $routeProvider.otherwise({
                redirectTo: '/departments'
            });
        }]);


    ng.module('employees')
        .config(DepartmentsConfig);

    DepartmentsConfig.inject = ['$routeProvider'];

    function DepartmentsConfig($routeProvider) {

        $routeProvider.when('/departments', {
            templateUrl: '/scripts/departments/index.html',
            controller: 'departmentsCtrl'
        });

    }
})(angular);
