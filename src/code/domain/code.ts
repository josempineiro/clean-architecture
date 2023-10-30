import { Entity, EntityUtils } from '@/core/domain';

export interface CodeCoverage {
  lines: CoverageMetrics;
  statements: CoverageMetrics;
  functions: CoverageMetrics;
  branches: CoverageMetrics;
}

export interface CoverageMetrics {
  total: number;
  covered: number;
  skipped: number;
  pct: number;
}

export interface Code extends Entity {
  _type: 'Code'
  path: string
  coverage: CodeCoverage
}

export const CodeUtils: EntityUtils<Code> = {
  getId: (code) => code.path,
  is: (entity: any): entity is Code => entity._type === 'Code',
  create: (code: Partial<Code>) => ({
    _type: 'Code',
    path: '',
    coverage: {
      lines: {
        total: 0,
        covered: 0,
        skipped: 0,
        pct: 0,
      },
      statements: {
        total: 0,
        covered: 0,
        skipped: 0,
        pct: 0,
      },
      functions: {
        total: 0,
        covered: 0,
        skipped: 0,
        pct: 0,
      },
      branches: {
        total: 0,
        covered: 0,
        skipped: 0,
        pct: 0,
      },
    },
    ...code,
  }),
}