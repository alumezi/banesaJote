import ReactLoading from 'react-loading';
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
        neighborhood: locationItem,
      })
    );
    dispatch(fetchProperties());
  };

  const handleNumberOfRoomsChange = (locationItem: IFilter) => {
    dispatch(
      setActiveFilters({
        ...allActiveFilters,
        numberOfRooms: locationItem,
      })
    );
    dispatch(fetchProperties());
  };

  const handleParkingChange = (locationItem: IFilter) => {
    dispatch(
      setActiveFilters({
        ...allActiveFilters,
        parking: locationItem,
      })
    );
    dispatch(fetchProperties());
  };

  if (filters.isFetching) {
    return (
      <ReactLoading
        height={'30%'}
        width={'30%'}
        className="react-loading"
        color="#28A745"
        type="bubbles"
      />
    );
  }

  return (
    <div className="flex space-x-4 mb-3 px-4">
      <Block classes="w-2/12">
        <Select
          items={filters.items.neighborhood}
          onChange={handleLocationChange}
          value={allActiveFilters.neighborhood?.name}
          defaultValue="Te gjitha"
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
          defaultValue="Te gjitha"
        />
      </Block>
      <Block classes="w-2/12">
        <Select
          items={filters.items.byParkingTypes}
          onChange={handleParkingChange}
          value={allActiveFilters.parking?.name}
          defaultValue="Te gjitha"
        />
      </Block>
    </div>
  );
};
