import { describe, it, expect } from 'vitest';
import { formatBytes } from '../../src/file/format';

describe('formatBytes', () => {
  it('应该正确格式化 0 字节', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
  });

  it('应该正确格式化字节单位', () => {
    expect(formatBytes(100)).toBe('100 Bytes');
  });

  it('应该正确格式化 KB 单位', () => {
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1536)).toBe('1.5 KB');
  });

  it('应该正确格式化 MB 单位', () => {
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(2097152)).toBe('2 MB');
  });

  it('应该正确格式化 GB 单位', () => {
    expect(formatBytes(1073741824)).toBe('1 GB');
  });

  it('应该使用指定的小数位数', () => {
    expect(formatBytes(1234567, 0)).toBe('1 MB');
    expect(formatBytes(1234567, 1)).toBe('1.2 MB');
    expect(formatBytes(1234567, 3)).toBe('1.177 MB');
  });

  it('应该处理负数小数位数', () => {
    expect(formatBytes(1234567, -1)).toBe('1 MB');
  });
}); 