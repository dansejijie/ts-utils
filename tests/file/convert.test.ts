import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dataUrlToFile, urlToFile } from '../../src/file/convert';

// 模拟 fetch API
global.fetch = vi.fn();
global.atob = vi.fn();

describe('dataUrlToFile', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // 模拟 atob 函数
    (global.atob as any).mockImplementation((str) => {
      return Buffer.from(str, 'base64').toString('binary');
    });
  });

  it('应该将 Data URL 转换为 File 对象', () => {
    // 创建一个简单的 base64 图片数据
    const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    
    // 调用函数
    const file = dataUrlToFile(dataUrl, 'test.jpg');
    
    // 验证结果
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('test.jpg');
    expect(file.type).toBe('image/jpeg');
  });

  it('应该使用提供的 MIME 类型', () => {
    const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    
    const file = dataUrlToFile(dataUrl, 'test.jpg', { type: 'image/png' });
    
    expect(file.type).toBe('image/png');
  });
});

describe('urlToFile', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('应该从 URL 获取文件并转换为 File 对象', async () => {
    // 模拟 fetch 响应
    const mockBlob = new Blob(['test content'], { type: 'image/jpeg' });
    (global.fetch as any).mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    });
    
    // 调用函数
    const file = await urlToFile('https://example.com/image.jpg', 'test.jpg');
    
    // 验证 fetch 被调用
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/image.jpg');
    
    // 验证结果
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('test.jpg');
    expect(file.type).toBe('image/jpeg');
  });

  it('应该使用提供的 MIME 类型', async () => {
    const mockBlob = new Blob(['test content'], { type: 'image/jpeg' });
    (global.fetch as any).mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(mockBlob)
    });
    
    const file = await urlToFile('https://example.com/image.jpg', 'test.jpg', { type: 'image/png' });
    
    expect(file.type).toBe('image/png');
  });

  it('应该处理获取失败的情况', async () => {
    // 模拟 fetch 失败
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });
    
    // 验证函数抛出错误
    await expect(urlToFile('https://example.com/not-found.jpg', 'test.jpg'))
      .rejects.toThrow('Failed to fetch: 404 Not Found');
  });

  it('应该处理网络错误', async () => {
    // 模拟网络错误
    (global.fetch as any).mockRejectedValue(new Error('Network error'));
    
    // 验证函数抛出错误
    await expect(urlToFile('https://example.com/error.jpg', 'test.jpg'))
      .rejects.toThrow('Network error');
  });
}); 