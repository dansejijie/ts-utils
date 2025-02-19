import { describe, it, expect } from 'vitest';
import { validateFile } from '../../src/utils/fileValidator';
import { FileValidationErrorType } from '../../src/utils/types/errors';

describe('fileValidator', () => {
  it('should validate file size', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    Object.defineProperty(file, 'size', { value: 20 * 1024 * 1024 }); // 20MB

    const result = validateFile(file, {
      maxSize: 10 * 1024 * 1024 // 10MB
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0].type).toBe(FileValidationErrorType.SIZE_EXCEEDED);
  });

  it('should validate file type', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    const result = validateFile(file, {
      allowedTypes: ['image/jpeg', 'image/png']
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0].type).toBe(FileValidationErrorType.INVALID_TYPE);
  });

  it('should validate file name', () => {
    const file = new File(['test'], 'test@#$.txt', { type: 'text/plain' });

    const result = validateFile(file, {
      namePattern: /^[a-zA-Z0-9-_\.]+$/
    });

    expect(result.isValid).toBe(false);
    expect(result.errors[0].type).toBe(FileValidationErrorType.INVALID_NAME);
  });

  it('should pass validation with valid file', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    const result = validateFile(file, {
      maxSize: 10 * 1024 * 1024,
      allowedTypes: ['text/plain'],
      namePattern: /^[a-zA-Z0-9-_\.]+$/
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
}); 