import {
  Box,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { BarChart, BarChartProps } from '@mui/x-charts'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { FC, memo, useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useSessionStorage } from 'usehooks-ts'

import { useHttpService, useTheme } from '@faf-cars/hooks'
import { MonthYearPair } from '@faf-cars/lib/date'
import { QueryKey } from '@faf-cars/lib/query-key'
import { StorageKey } from '@faf-cars/lib/storage-key'

const ListingsCharts: FC = () => {
  const http = useHttpService()
  const theme = useTheme()

  const isXl = useMediaQuery(theme.breakpoints.up('xl'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))

  const [statsDate, setStatsDate] = useSessionStorage<MonthYearPair>(
    StorageKey.StatsDate,
    {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    },
  )

  const handleStatsDateChange = useCallback((value: dayjs.Dayjs | null) => {
    if (!value) {
      return
    }

    setStatsDate(() => ({
      month: value.month(),
      year: value.year(),
    }))
  }, [])

  const listingStatsQuery = useQuery(
    [QueryKey.ListingsStats, statsDate],
    () =>
      http.getListingsStats({
        includeStats: true,
        year: statsDate.year,
        month: statsDate.month + 1,
      }),
    {
      enabled: !!statsDate,
    },
  )

  const datePickerElement = useMemo(
    () => (
      <DatePicker
        views={['year', 'month']}
        label="Period"
        minDate={dayjs(new Date(2024, 5))}
        maxDate={dayjs()}
        value={dayjs(new Date(statsDate.year, statsDate.month))}
        onChange={handleStatsDateChange}
      />
    ),
    [statsDate],
  )

  const dataElement = useMemo(
    () => (
      <Stack direction="column" width={300} height={64} spacing={1}>
        {listingStatsQuery.data ? (
          <>
            <Stack direction="row" spacing={1}>
              <Typography>Total listings:</Typography>
              <Typography color="primary.main">
                {listingStatsQuery.data.totalListings}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography>Created today:</Typography>
              <Typography color="primary.main">
                {listingStatsQuery.data.createdToday}
              </Typography>
            </Stack>
          </>
        ) : (
          <>
            <Skeleton width={200} height={30} variant="rounded" />
            <Skeleton width={200} height={30} variant="rounded" />
          </>
        )}
      </Stack>
    ),
    [listingStatsQuery.data],
  )

  const chartElement = useMemo(() => {
    const chartWidth: number = isXl
      ? theme.breakpoints.values.xl
      : isLg
        ? theme.breakpoints.values.lg
        : theme.breakpoints.values.md
    const chartHeight = 600

    if (listingStatsQuery.isLoading) {
      return (
        <Box
          width={chartWidth}
          height={chartHeight}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      )
    }

    if (listingStatsQuery.isError) {
      return (
        <Box
          width={chartWidth}
          height={chartHeight}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>Error loading stats</Typography>
        </Box>
      )
    }

    const series: BarChartProps['series'] = [
      {
        data: listingStatsQuery.data!.createdListingsStats,
        label: 'Created listings',
        color: theme.palette.secondary.main,
        stack: '1',
      },
      {
        data: listingStatsQuery.data!.totalListingsStats,
        label: 'Total listings',
        color: theme.palette.primary.main,
        stack: '2',
      },
    ]

    const yAxis: BarChartProps['yAxis'] = [
      {
        min: 0,
        max: Math.max(
          (listingStatsQuery.data!.totalListingsStats.at(-1) ?? 0) * 1.15,
          26,
        ),
      },
    ]

    const xAxis: BarChartProps['xAxis'] = [
      {
        scaleType: 'band',
        data: listingStatsQuery.data!.totalListingsStats.map((p, i) => i + 1),
        label: 'Day of month',
        tickPlacement: 'middle',
      },
    ]

    return (
      <BarChart
        height={chartHeight}
        width={chartWidth}
        grid={{ horizontal: true, vertical: true }}
        skipAnimation={false}
        borderRadius={4}
        xAxis={xAxis}
        yAxis={yAxis}
        series={series}
      />
    )
  }, [listingStatsQuery, isXl, isLg])

  return (
    <Stack spacing={3} mt={3} display="flex" alignItems="start">
      {datePickerElement}
      {chartElement}
      {dataElement}
    </Stack>
  )
}

export default memo(ListingsCharts)
