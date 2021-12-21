import { useSelector } from 'react-redux';
import { RootState } from '../../../../types';
import { ListItem } from '../listItem';
import './index.css';

export const List = () => {
  const properties = useSelector((state: RootState) => state.properties);

  return (
    <div className="list__properties">
      {properties.items.map((element) => (
        <ListItem data={element} key={element.id} />
      ))}
    </div>
  );
};
