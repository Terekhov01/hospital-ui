import { Patient } from './patient';

describe('Patient', () => {
  it('should create an instance', () => {
    expect(new Patient("", "", BigInt(0), "", "", "", "", "", "", "")).toBeTruthy();
  });
});
