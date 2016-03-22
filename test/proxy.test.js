"use strict";

describe("Proxy", function ()
{
  var $httpBackend,
      $scope,
      $rootScope,
      $resource,
      $http;

  beforeEach(module("ngResource"));
  beforeEach(module("ngMockE2E"));
  beforeEach(inject(function($injector)
  {
    $httpBackend = $injector.get("$httpBackend");
    $resource = $injector.get("$resource");
    $rootScope = $injector.get("$rootScope");
    $http = $injector.get("$http");
  }));

  it("fully mockes a result from API server", function()
  {
    var companiesUrl = "/2c2QLNapBjq/company";
    var Company = $resource(companiesUrl);
    $httpBackend.expectGET(companiesUrl).respond([{id: "2c2QLNapBjq"}]);
    var c = Company.query();
    c.$promise.then(
    function(companies)
    {
      console.log(companies);
      expect(companies).to.be.an.array;
      expect(companies).to.deep.include.members([{id: "2c2QLNapBjq"}]);
      expect(companies[0]).have.property("id", "2c2QLNapBjq");
    });
    $httpBackend.flush();
  });

  it("fully mockes a result from API server and uses promises test", function()
  {
    var companiesUrl = "/2c2QLNapBjq/company";
    var Company = $resource(companiesUrl);
    $httpBackend.expectGET(companiesUrl).respond([{id: "2c2QLNapBjq"}]);
    var promise = Company.query().$promise;
    var expectedPromise = expect(promise).to.eventually.include.keys("id");
    $httpBackend.flush();
    return expectedPromise;
  });


  it("fully mockes a result from API using $http (not $resource)", function()
  {
    var companiesUrl = "/2c2QLNapBjq/company";
    $httpBackend.expectGET(companiesUrl).respond([{id: "2c2QLNapBjq"}]);
    var promise = $http.get(companiesUrl).then(function(response)
    {
      var companies = response.data;
      expect(companies).to.be.an.array;
      expect(companies).to.deep.include.members([{id: "2c2QLNapBjq"}]);
      expect(companies[0]).have.property("id", "2c2QLNapBjq");
    });
    $httpBackend.flush();
  });
});
