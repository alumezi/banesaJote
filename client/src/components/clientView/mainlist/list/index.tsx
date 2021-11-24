import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import { RootState } from '../../../../types';
import { ListItem } from '../listItem';
import './index.css';

export const List = () => {
  const properties = useSelector((state: RootState) => state.properties);

  if (properties.isFetching) {
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
    <div className="list__properties">
      {properties.items.map((element) => (
        <ListItem data={element} key={element.id} />
      ))}
    </div>
  );
};
