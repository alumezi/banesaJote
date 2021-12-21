import { useDispatch, useSelector } from 'react-redux';

import { Select } from '../../../lib/components/select';
import { Input } from '../../../lib/components/input';
import { Block } from '../../../lib/layout/block';
import { IFilter, RootState } from '../../../types';
import { fetchProperties, setActiveFilters } from '../../../actions';
import './index.css';

export const FilterBar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const filters = state.filters;
  const { neighborhood } = state.activeFilters.items;

  const handleLocationChange = (locationItem: IFilter) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 17 ~ handleLocationChange ~ locationItem',
      locationItem
    );
    dispatch(setActiveFilters({ neighborhood: locationItem.searchKey }));
    dispatch(fetchProperties());
  };

  if (filters.isFetching) {
    return null;
  }

  return (
    <div className="flex space-x-4 mb-3 px-4">
      <Block classes="w-2/12">
        <Select
          items={filters.items.neighborhood}
          onChange={handleLocationChange}
          value={neighborhood?.name}
        />
      </Block>
      <Block classes="w-2/12">
        <Input placeholder="Nga" prepend="€" />
      </Block>
      <Block classes="w-2/12">
        <Input prepend="€" />
      </Block>
      <Block classes="w-2/12">
        <Select items={filters.items.byNumberOfRooms} />
      </Block>
      <Block classes="w-2/12">
        <Select items={filters.items.byParkingTypes} />
      </Block>
    </div>
  );
};
