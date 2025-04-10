export interface IApplicationError extends Error {
  id: string;
  status?: number;
  code: string;
  title: string;
  meta?: any;
  source?: any;
}


