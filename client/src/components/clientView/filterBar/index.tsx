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
  const allActiveFilters = state.activeFilters.items;

  const handleLocationChange = (locationItem: IFilter) => {
    dispatch(
      setActiveFilters({
        ...allActiveFilters,
        neighborhood: locationItem.searchKey,
      })
    );
    dispatch(fetchProperties());
  };

  const handleNumberOfRoomsChange = (locationItem: IFilter) => {
    dispatch(
      setActiveFilters({
        ...allActiveFilters,
        numberOfRooms: locationItem.searchKey,
      })
    );
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
          value={allActiveFilters.neighborhood?.name}
        />
      </Block>
      <Block classes="w-2/12">
        <Input placeholder="Nga" prepend="€" />
      </Block>
      <Block classes="w-2/12">
        <Input prepend="€" />
      </Block>
      <Block classes="w-2/12">
        <Select
          items={filters.items.byNumberOfRooms}
          onChange={handleNumberOfRoomsChange}
          value={allActiveFilters.numberOfRooms?.name}
        />
      </Block>
      <Block classes="w-2/12">
        <Select items={filters.items.byParkingTypes} />
      </Block>
    </div>
  );
};
