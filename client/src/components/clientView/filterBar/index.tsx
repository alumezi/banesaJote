import { useDispatch, useSelector } from 'react-redux';

import { Select } from '../../../lib/components/select';
import { Input } from '../../../lib/components/input';
import { Block } from '../../../lib/layout/block';
import { IFilter, RootState } from '../../../types';
import { fetchProperties, setActiveFilters } from '../../../actions';
import './index.css';

export interface IFilterBar {
  [key: string]: IFilter[];
}

export const FilterBar = ({ data }: { data: IFilterBar }) => {
  const dispatch = useDispatch();
  const { neighborhood } = useSelector(
    (state: RootState) => state.activeFilters.items
  );

  const handleLocationChange = (locationItem: IFilter) => {
    dispatch(setActiveFilters({ neighborhood: locationItem }));
    dispatch(fetchProperties());
  };

  return (
    <div className="flex space-x-4 mb-3 px-4">
      <Block classes="w-2/12">
        <Select
          items={data.byLocation}
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
        <Select items={data.byNumberOfRooms} />
      </Block>
      <Block classes="w-2/12">
        <Select items={data.byParkingTypes} />
      </Block>
    </div>
  );
};
