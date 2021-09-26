import './index.css';
import { Select } from '../../../lib/components/select';
import { Input } from '../../../lib/components/input';
import { Block } from '../../../lib/layout/block';

export const FilterBar = ({ data }) => {
  return (
    <div className="flex space-x-4 mb-3 px-4">
      <Block classes="w-2/12">
        <Select items={data.byLocation} placeholder="Lokacioni" />
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
