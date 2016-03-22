describe("Proxy", function ()
{
  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$resource_)
  {
    $scope = _$rootScope_;
    $http = _$http_;
    $resource = _$resource;
  }));

  it("gets proxied result from API server with promises", function()
  {
    var apiUrl = "/2c2QLNapBjq/company";
    $httpBackend.whenGET(apiUrl).passThrough();

    var Company = $resource(apiUrl);

    $scope.regions = Regions.query();
    var promise = $scope.regions.$promise;
    return expect(promise).to.eventually.have.property("id", "2c2QLNapBjq");
  });

});
