import { MonthYearPair } from '@carhive/lib/date';

export interface MarketStatistics {
  totalListings: number;
  createdToday?: number;
  totalListingsStats: number[];
  createdListingsStats: number[];
}

export interface MarketStatisticsQuery extends MonthYearPair {
  includeStats: boolean;
}
