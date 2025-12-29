import { Version } from './types';

describe('Version', () => {
  it('parse', () => {
    const v = Version.parse('1.10');

    expect(v.major).toEqual(1);
    expect(v.minor).toEqual(10);
    expect(v.patch).toEqual(0);

    const v2 = Version.parse('1.16.220');

    expect(v2.major).toEqual(1);
    expect(v2.minor).toEqual(16);
    expect(v2.patch).toEqual(220);
  });

  it('from Array', () => {
    const v = Version.fromArray([1, 16, 220]);

    expect(v.major).toEqual(1);
    expect(v.minor).toEqual(16);
    expect(v.patch).toEqual(220);

    const vv = Version.fromArray([1, 16]);

    expect(vv.major).toEqual(1);
    expect(vv.minor).toEqual(16);
    expect(vv.patch).toEqual(0);
  });

  it('compare', () => {
    expect(Version.compare('1.10.0', '1.17.0')).toEqual(-1);
    expect(Version.compare('1.16.220', '1.10.0')).toEqual(1);
    expect(Version.compare([1, 10, 220], '1.10.0')).toEqual(1);

    expect(Version.compare({ major: 1, minor: 10, patch: 0 }, '1.17.0')).toEqual(-1);
    expect(Version.compare('1.16.220', { major: 1, minor: 10, patch: 0 })).toEqual(1);
    expect(Version.compare([1, 10, 220], { major: 1, minor: 10, patch: 0 })).toEqual(1);
  });

  it('is - valid version', () => {
    const version = { major: 1, minor: 2, patch: 3 };

    expect(Version.is(version)).toBeTruthy();
  });

  it('is - invalid version with non-number major', () => {
    const version = { major: '1', minor: 2, patch: 3 };

    expect(Version.is(version)).toBeFalsy();
  });

  it('is - invalid version with non-number minor', () => {
    const version = { major: 1, minor: '2', patch: 3 };

    expect(Version.is(version)).toBeFalsy();
  });

  it('is - invalid version with non-number patch', () => {
    const version = { major: 1, minor: 2, patch: '3' };

    expect(Version.is(version)).toBeFalsy();
  });

  it('is - non-object value', () => {
    expect(Version.is('1.2.3')).toBeFalsy();
    expect(Version.is(null)).toBeFalsy();
    expect(Version.is(undefined)).toBeFalsy();
  });

  it('toString', () => {
    const version = { major: 1, minor: 16, patch: 220 };

    expect(Version.toString(version)).toEqual('1.16.220');
  });

  it('compare - arrays', () => {
    expect(Version.compare([1, 10, 0], [1, 17, 0])).toEqual(-1);
    expect(Version.compare([1, 16, 220], [1, 10, 0])).toEqual(1);
    expect(Version.compare([1, 10, 0], [1, 10, 0])).toEqual(0);
  });
});
