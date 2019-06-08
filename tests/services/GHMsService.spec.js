var chai = require('chai');
var rewire = require('rewire');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const GHMsService = rewire('../../services/GHMsService');

describe('GHMs:', function () {
    before('Prepare for GHMs test specs', function () {});

    it('Should be rejected with ErrorOperationNotImplemetedException when calling getGHMByCode', function () {
        return GHMsService.getGHMByCode('code').should.eventually.rejected;
    });

    after('Cleanup GHMs test specs', function () {});
});
