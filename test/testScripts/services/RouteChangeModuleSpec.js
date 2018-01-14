describe('RouteChangeModule test', function() {
	var $location, $rootScope, $route, $httpProvider;
	var mockAuthenticationHolderService;
	var loggedIn;
	beforeEach(module('RouteChangeModule', function ($provide, _$httpProvider_) {
		mockAuthenticationHolderService = {
			isLoggedIn: function() { return loggedIn; }
		};
		$provide.value('AuthenticationHolderService', mockAuthenticationHolderService);
		$httpProvider = _$httpProvider_;
	}));
	beforeEach(inject(function(_$location_, _$rootScope_, _$route_) {
		$location = _$location_;
		spyOn($location, 'path');
		$rootScope = _$rootScope_;
		$route = _$route_;
	}));
	it('should change to login page if user is not logged int.', function() {
		loggedIn = false;
		$rootScope.$broadcast("$routeChangeStart");
		expect($location.path).toHaveBeenCalledWith('/login');
	});
	it('should change to login page if user is not logged int.', function() {
		loggedIn = true;
		$rootScope.$broadcast("$routeChangeStart");
		expect($location.path).not.toHaveBeenCalled();
	});
	it('should check routing configurations', function() {
		var loginRoute = $route.routes['/login'];
		expect(loginRoute.controller).toBe('LoginController');
		expect(loginRoute.controllerAs).toBe('ctrl');
		expect(loginRoute.templateUrl).toBe('pages/login/login.view.html');
		
		var helloRoute = $route.routes['/hello'];
		expect(helloRoute.controller).toBe('HelloController');
		expect(helloRoute.controllerAs).toBe('ctrl');
		expect(helloRoute.templateUrl).toBe('pages/hello/hello.view.html');
		
		var orderRoute = $route.routes['/order'];
		expect(orderRoute.controller).toBe('OrderPageController');
		expect(orderRoute.controllerAs).toBe('ctrl');
		expect(orderRoute.templateUrl).toBe('pages/order/order.view.html');
		
		expect($route.routes[null].redirectTo).toBe('/order');
	});
	it('should check authentication interceptor is registered.', function() {
		expect($httpProvider.interceptors[0]).toBe('AuthInterceptor');
	});
});