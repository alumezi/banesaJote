import { PostFormComponent } from './form';
import { List } from '../clientView/mainlist/list';
import { IFilter, IProperty } from '../../types';

export function PostComponent({
  properties,
  filterData,
  handleCreatePropertySubmit,
}: {
  properties: IProperty[];
  filterData: Record<string, IFilter[]>;
  handleCreatePropertySubmit: (value: IProperty) => void;
}) {
  return (
    <div className="md:grid md:grid-cols-2 md:gap-3 h-full w-full top-auto">
      <div className="md:col-span-1" style={{ height: 'calc(100vh - 74px)' }}>
        <List properties={properties} />
      </div>
      <div className="md:col-span-1">
        <PostFormComponent
          filterData={filterData}
          handleCreatePropertySubmit={handleCreatePropertySubmit}
        />
      </div>
    </div>
  );
}
