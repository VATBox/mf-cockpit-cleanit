export interface DataPullerSource {
  value: string;
  viewValue: string;
}

export interface FetchRequestModel {
  accountId: number;
  serviceName: string;
  pullDate: string;
}

export interface HistoryResponseModel {
  activeJobs: JobStatusModel;
  stuckedJobs: JobStatusModel;
  jobs: JobModel[];
}

export interface JobStatusModel {
  ids: string;
  jobs: number;
}

export interface JobModel {
  id: number;
  transactionsCount: number;
  activeTransactionsCount: number;
  endedTransactionsCount: number;
  failedTransactionsCount: number;
  account_id: number;
  reportsCount: number;
  reports: ReportModel[];
  processedReportsCount: number;
  attemptedReportsCount: number;
  requestParams: {
    status: string;
    pullDate: string;
  };
  error: string;
  started_at: string;
  ended_at: string;
  service_name: string;
  created_at: string;
  updated_at: string;
  activeReports: {
    ids: string;
    reports: number;
  };
  endedReports: {
    ids: string;
    reports: number;
  };
}

export interface ReportModel {
  id: number;
  createdAt: string;
  endedAt: string;
  activeTransactions: number[];
  endedTransactions: number[];
  failedTransactions: number[];
  startedAt: string;
  transactionCount: string;
  transactions: TransactionModel[];
}

export interface TransactionModel {
  id: number;
  createdAt: string;
  exportDate: string;
  fetchedAt: string;
  imageExists: boolean;
  imaginaryId: string;
  originalId: string;
  originalReportId: string;
  sentImaginary: boolean;
  sentTransaction: boolean;
}
