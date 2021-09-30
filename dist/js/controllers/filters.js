var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
FilterRouter.post('/seed', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield Filters.deleteMany({});
    Filters.insertMany(filters, (err) => {
        if (err) {
            logger.info(err);
            logger.info(err.message);
            logger.info('ERRRORRRRRR');
            response.status(400).end();
        }
        else {
            response.status(200).send(`Database filters seeded`);
        }
    });
}));
export default FilterRouter;
