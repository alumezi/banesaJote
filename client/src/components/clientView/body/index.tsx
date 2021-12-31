import { Block } from '../../../lib/layout/block';
import mapBoxUrl from '../../../assets/mapbox-placeholder.png';
import { List } from '../mainlist/list';

export const MainBody = () => {
  return (
    <div
      className="flex space-x-4 px-4"
      style={{ height: 'calc(100vh - 125px)' }}
    >
      <Block classes="w-full h-full">
        <figure className="flex h-full">
          <div className="w-6/12">
            <List />
          </div>
          <div className="w-6/12">
            <img
              src={mapBoxUrl}
              width="100%"
              height="100%"
              className="h-full object-cover"
              alt="The preview of the property for lease or for sale"
            />
          </div>
        </figure>
      </Block>
    </div>
  );
};
