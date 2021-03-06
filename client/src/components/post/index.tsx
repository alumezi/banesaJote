import { PostFormComponent } from './form';
import { List } from '../clientView/mainlist/list';
import { IFilter, IProperty } from '../../types';

export function PostComponent({
  filterData,
  handleCreatePropertySubmit,
}: {
  filterData: Record<string, IFilter[]>;
  handleCreatePropertySubmit: (value: IProperty) => Promise<void>;
}) {
  return (
    <div
      data-testid="post_component"
      className="md:grid md:grid-cols-2 md:gap-3 h-full w-full top-auto"
    >
      <div className="md:col-span-1" style={{ height: 'calc(100vh - 74px)' }}>
        <List />
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
