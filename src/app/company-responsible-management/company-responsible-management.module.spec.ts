import { CompanyResponsibleManagementModule } from './company-responsible-management.module';

describe('CompanyResponsibleManagementModule', () => {
  let companyResponsibleManagementModule: CompanyResponsibleManagementModule;

  beforeEach(() => {
    companyResponsibleManagementModule = new CompanyResponsibleManagementModule();
  });

  it('should create an instance', () => {
    expect(companyResponsibleManagementModule).toBeTruthy();
  });
});
