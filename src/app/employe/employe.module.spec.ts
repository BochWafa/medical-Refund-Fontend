import { EmployeModule } from './employe.module';

describe('EmployeModule', () => {
  let employeModule: EmployeModule;

  beforeEach(() => {
    employeModule = new EmployeModule();
  });

  it('should create an instance', () => {
    expect(employeModule).toBeTruthy();
  });
});
