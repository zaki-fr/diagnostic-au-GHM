var chai = require('chai');
var rewire = require('rewire');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const DiagnosticService = rewire('../../services/DiagnosticService');

describe('Diagnostic:', function () {
    before('Prepare for Diagnostic test specs', function () {});

    it('Should be rejected with ErrorOperationNotImplemetedException when calling getACTsByDiagnosticCode', function () {
        return DiagnosticService.getACTsByDiagnosticCode('code').should.eventually.rejected;
    });


    it('Should be rejected with ErrorOperationNotImplemetedException when calling diagnosticGHM', function () {
        return DiagnosticService.diagnosticGHM('body').should.eventually.rejected;
    });

    after('Cleanup Diagnostic test specs', function () {});
});
