
export interface IMetric {
    totalAssigned: number;
    successRate: number;
    averageTime: number;
    failureReasons:{
        reason: string;
        count: number;
    };
}