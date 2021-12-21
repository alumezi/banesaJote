import Express from 'express';
import short from 'short-uuid';
import Filters from '../models/filters';
import logger from '../utils/logger';

const FilterRouter = Express.Router();

FilterRouter.get('/', (request, response, next) => {
  Filters.find({})
    .then((res) => {
      response.json(res);
    })
    .catch((err) => next(err));
});

FilterRouter.post('/seed', async (request, response) => {
  const filters = [
    {
      name: 'neighborhood',
      filters: [
        {
          id: '',
          name: 'Aktash',
          searchKey: 'Aktash',
        },
        {
          id: '',
          name: 'Ulpiane',
          searchKey: 'Ulpiane',
        },
        {
          id: '',
          name: 'Dardani',
          searchKey: 'Dardani',
        },
        {
          id: '',
          name: 'Rruga B',
          searchKey: 'Rruga B',
        },
        {
          id: '',
          name: 'Mati 1',
          searchKey: 'Mati 1',
        },
        {
          id: '',
          name: 'Lagjia e spitalit',
          searchKey: 'Lagjia e spitalit',
        },
      ],
    },
    {
      name: 'byNumberOfRooms',
      filters: [
        {
          id: '01',
          name: '1',
          searchKey: '1',
        },
        {
          id: '02',
          name: '2',
          searchKey: '2',
        },
        {
          id: '03',
          name: '3',
          searchKey: '3',
        },
        {
          id: '04',
          name: '4',
          searchKey: '4',
        },
      ],
    },
    {
      name: 'byParkingTypes',
      filters: [
        {
          id: '01',
          name: 'Ska parking',
          searchKey: 'Ska parking',
        },
        {
          id: '02',
          name: 'Parking Komunal',
          searchKey: 'Parking Komunal',
        },
        {
          id: '03',
          name: 'Garazhe',
          searchKey: 'Garazhe',
        },
        {
          id: '04',
          name: 'Parking Banesor',
          searchKey: 'Parking Banesor',
        },
      ],
    },
    {
      name: 'features',
      filters: [
        { id: '01', name: 'Terrase', searchKey: 'Terrase' },
        { id: '02', name: 'Terrase', searchKey: 'Terrase' },
      ],
    },
    {
      name: 'amenities',
      filters: [
        { id: '01', name: 'wifi', searchKey: 'wifi' },
        { id: '02', name: 'tv', searchKey: 'tv' },
        { id: '02', name: 'washingMachine', searchKey: 'washingMachine' },
        { id: '02', name: 'fridge', searchKey: 'fridge' },
      ],
    },
  ];

  filters.forEach((item) => {
    item.filters.forEach((filter) => {
      filter.id = short.generate();
    });
  });

  await Filters.deleteMany({});

  Filters.insertMany(filters, (err) => {
    if (err) {
      logger.info(err);
      logger.info(err.message);
      logger.info('ERRRORRRRRR');
      response.status(400).end();
    } else {
      response.status(200).send(`Database filters seeded`);
    }
  });
});

export default FilterRouter;
