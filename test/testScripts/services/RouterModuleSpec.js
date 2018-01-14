describe('RouterModule test', function() {
	var $location, RouteService;
	var loggedIn;
	beforeEach(module('RouterModule'));
	beforeEach(inject(function(_$location_, _RouteService_) {
		$location = _$location_;
		spyOn($location, 'path');
		RouteService = _RouteService_;
	}));
	it('should check redirect to login is working right.', function() {
		RouteService.redirectToLogin();
		expect($location.path).toHaveBeenCalledWith('/login');
	});
	it('should check redirect to hello is working right.', function() {
		RouteService.redirectToHello();
		expect($location.path).toHaveBeenCalledWith('/hello');
	});
	it('should check redirect to order is working right.', function() {
		RouteService.redirectToOrder();
		expect($location.path).toHaveBeenCalledWith('/order');
	});
});