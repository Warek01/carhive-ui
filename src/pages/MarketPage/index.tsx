import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useLocalStorage, useSessionStorage } from 'usehooks-ts';

import { CarTypesFilter, ListingsList } from '@faf-cars/components';
import {
  useAuth,
  useHttpService,
  usePagination,
  useWatchLoading,
} from '@faf-cars/hooks';
import {
  BodyStyle,
  LISTING_ORDER_BY_VALUES,
  ListingDto,
  ListingOrderBy,
} from '@faf-cars/lib/listings';
import { PaginatedResponse } from '@faf-cars/lib/pagination';
import { QueryKey } from '@faf-cars/lib/query';
import { StorageKey } from '@faf-cars/lib/storage';
import {
  LISTING_TABS,
  ListingsTab,
} from '@faf-cars/pages/MarketPage/constants';

const MarketPage: FC = () => {
  const http = useHttpService();
  const { userId } = useAuth();
  const [orderBy, setOrderBy] = useLocalStorage<ListingOrderBy>(
    StorageKey.ListingsOrderBy,
    ListingOrderBy.CreatedAtAsc,
  );
  const [isFilterListOpen, setIsFilterListOpen] = useState(false);

  const [selectedBodyStyles, setSelectedBodyStyles] = useLocalStorage<
    BodyStyle[]
  >(StorageKey.ListingsFilter, []);

  const [selectedTab, setSelectedTab] = useSessionStorage<ListingsTab>(
    StorageKey.ListingsTab,
    ListingsTab.All,
  );

  const pagination = usePagination(StorageKey.ListingsPagination);

  const fetchListingsFn = useCallback((): Promise<
    PaginatedResponse<ListingDto>
  > => {
    const params = {
      take: pagination.size,
      page: pagination.page,
      order: orderBy,
      body: selectedBodyStyles,
    };

    const tabFetchFnMap: Record<
      ListingsTab,
      Promise<PaginatedResponse<ListingDto>>
    > = {
      [ListingsTab.All]: http.getListings(params),
      [ListingsTab.Favorites]: http.getListings({
        ...params,
        user: userId,
        favorites: true,
      }),
      [ListingsTab.My]: http.getListings({ ...params, user: userId }),
    };

    return tabFetchFnMap[selectedTab];
  }, [selectedTab, pagination, orderBy, selectedBodyStyles, userId]);

  const listingsListQuery = useQuery(
    [
      QueryKey.ListingsList,
      pagination,
      orderBy,
      selectedBodyStyles,
      selectedTab,
    ],
    fetchListingsFn,
  );

  const listings = listingsListQuery.data?.items ?? [];

  const tabsElements = useMemo(
    () =>
      LISTING_TABS.map(({ text, value, Icon }) => (
        <Tab
          key={value}
          value={value}
          icon={<Icon fontSize="medium" />}
          iconPosition="start"
          label={text}
        />
      )),
    [],
  );

  const orderByElement = useMemo(
    () => (
      <FormControl fullWidth>
        <InputLabel>Order</InputLabel>
        <Select
          value={orderBy}
          size="small"
          label="Order"
          onChange={(e) => setOrderBy(e.target.value as ListingOrderBy)}
        >
          {Array.from(LISTING_ORDER_BY_VALUES).map(([value, text]) => (
            <MenuItem value={value} key={value}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
    [orderBy],
  );

  useWatchLoading(listingsListQuery.isLoading);

  useEffect(() => {
    if (!listingsListQuery.data) return;

    pagination.setItems(listingsListQuery.data.totalItems);
  }, [listingsListQuery.data]);

  useEffect(() => {
    pagination.setPage(0);
  }, [
    selectedBodyStyles,
    pagination.count,
    pagination.size,
    orderBy,
    selectedTab,
  ]);

  const filteringSection = useMemo<ReactElement>(
    () => (
      <Box component="section">
        <List component="nav">
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Tabs
                  value={selectedTab}
                  onChange={(e, tab) => setSelectedTab(tab)}
                >
                  {tabsElements}
                </Tabs>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                alignItems="center"
                justifyContent="end"
              >
                <Button
                  endIcon={isFilterListOpen ? <ExpandLess /> : <ExpandMore />}
                  onClick={() => setIsFilterListOpen((v) => !v)}
                >
                  {isFilterListOpen ? 'Collapse' : 'Open'}
                </Button>
              </Grid>
            </Grid>
          </ListItem>
          <Collapse in={isFilterListOpen}>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  {orderByElement}
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Items per page</InputLabel>
                    <Select
                      value={pagination.size}
                      size="small"
                      label="Items per page"
                      onChange={(e) => pagination.setSize(e.target.value)}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <CarTypesFilter
                onChange={setSelectedBodyStyles}
                selected={selectedBodyStyles}
              />
            </ListItem>
          </Collapse>
        </List>
      </Box>
    ),
    [selectedTab, tabsElements, pagination, orderByElement, selectedBodyStyles],
  );

  const listSection = useMemo<ReactElement>(
    () => (
      <Box
        component="section"
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={8}
        pb={10}
      >
        <ListingsList items={listings} skeletonCount={pagination.size} />

        {pagination.count > 1 && (
          <Pagination
            count={pagination.count}
            size="large"
            page={pagination.page + 1}
            onChange={(e, page) => pagination.setPage(page - 1)}
          />
        )}
      </Box>
    ),
    [pagination, listings],
  );

  return (
    <Stack spacing={3}>
      {filteringSection}
      {listSection}
    </Stack>
  );
};

export default MarketPage;
