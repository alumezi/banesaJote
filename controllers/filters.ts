import Express from 'express';
import short from 'short-uuid';
import Filters from '../models/filters';
import { IFilters } from '../types';
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
      name: 'byLocation',
      filters: [
        {
          id: '',
          name: 'Aktash',
        },
        {
          id: '',
          name: 'Ulpiane',
        },
        {
          id: '',
          name: 'Dardani',
        },
        {
          id: '',
          name: 'Rruga B',
        },
        {
          id: '',
          name: 'Mati 1',
        },
        {
          id: '',
          name: 'Lagjia e spitalit',
        },
      ],
    },
    {
      name: 'byNumberOfRooms',
      filters: [
        {
          id: '01',
          name: '1',
        },
        {
          id: '02',
          name: '2',
        },
        {
          id: '03',
          name: '3',
        },
        {
          id: '04',
          name: '4',
        },
      ],
    },
    {
      name: 'byParkingTypes',
      filters: [
        {
          id: '01',
          name: 'Ska parking',
        },
        {
          id: '02',
          name: 'Parking Komunal',
        },
        {
          id: '03',
          name: 'Garazhe',
        },
        {
          id: '04',
          name: 'Parking Banesor',
        },
      ],
    },
    {
      name: 'features',
      filters: [
        { id: '01', name: 'terrace' },
        { id: '02', name: 'kitchen' },
      ],
    },
    {
      name: 'amenities',
      filters: [
        { id: '01', name: 'wifi' },
        { id: '02', name: 'tv' },
        { id: '02', name: 'washingMachine' },
        { id: '02', name: 'fridge' },
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
