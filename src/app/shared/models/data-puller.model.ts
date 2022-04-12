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
  accountId: number;
  reportsCount: number;
  processedReportsCount: number;
  attemptedReportsCount: number;
  requestParams: {
    status: string;
    pullDate: string;
  };
  error: string;
  startedAt: string;
  endedAt: string;
  serviceName: string;
  createdAt: string;
  updatedAt: string;
  activeReports: {
    ids: string;
    reports: number;
  };
  endedReports: {
    ids: string;
    reports: number;
  };
}
