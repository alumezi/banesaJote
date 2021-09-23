import { ListItem } from '../listItem';
import './index.css';

export const List = ({ properties }) => {
  return (
    <div className="list__properties">
      {properties.map((element) => (
        <ListItem data={element} key={element.id} />
      ))}
    </div>
  );
};
