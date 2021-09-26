import { Block } from '../../../lib/layout/block';
import mapBoxUrl from '../../../assets/mapbox-placeholder.png';
import { List } from '../mainlist/list';
import { IProperty } from '../../../types';

export const MainBody = ({
  properties,
}: {
  properties: IProperty[];
}): JSX.Element => {
  return (
    <div className="flex space-x-4 px-4">
      <Block classes="w-full h-full">
        <figure className="flex">
          <div className="w-6/12" style={{ height: 'calc(100vh - 155px)' }}>
            <List properties={properties} />
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
