import './index.css';
import { LocationIcon, Icon } from '../../../../lib/components/icons';
import { parseFeaturesInCurrentLanguage } from '../../../../util/parsers/albanian';
import { CircleLevel } from '../../../../lib/components/circleLevel';
import { ListItemBookMark } from '../listItemBookMark';
import { IProperty } from '../../../../types';
import { ErrorBoundary } from '../../../errorBoundary';

export const ListItem = ({ data }: { data: IProperty }) => {
  return (
    <ErrorBoundary>
      <div className="list__item">
        <div className="lif__img__container">
          {/* we need a carousel here */}
          <img
            src={data?.pictureUrls[0]}
            width="100%"
            height="100%"
            className="lif__img"
            alt="The preview of the property for lease or for sale"
          />
        </div>
        <div className="lif__body">
          <div className="lifb__info mb_first-children--2">
            <div className="lifb__neighborhood">
              {data.neighborhood}
              <span className="lifbn__icon__container">
                <LocationIcon className="lifbn__icon" />
              </span>
            </div>
            <div className="lifb__features">
              {data.numberOfRooms && data.numberOfRooms + ' Dhoma · '}
              {data.features
                .map((item) => parseFeaturesInCurrentLanguage(item))
                .join(' · ')}
            </div>
            <div className="lifb__amenities">
              {data.amenities.map((item) => (
                <Icon iconName={item} className="lifba__icon" key={item} />
              ))}
            </div>
            <CircleLevel label="Niveli i qetesis:" amountOfDots={5} />
          </div>
          <div className="lif__footer">
            <div className="liff__date">{data.date}</div>
            <div className="liff__price">
              <span className="liff__price__color">{data.price}</span>
              <span className="liff__price__divider">/</span>muaj
            </div>
          </div>
        </div>
        <ListItemBookMark content={23} />
      </div>
    </ErrorBoundary>
  );
};
