"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const short_uuid_1 = __importDefault(require("short-uuid"));
const filters_1 = __importDefault(require("../models/filters"));
const logger_1 = __importDefault(require("../utils/logger"));
const FilterRouter = express_1.default.Router();
FilterRouter.get('/', (request, response, next) => {
    filters_1.default.find({})
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
            filter.id = short_uuid_1.default.generate();
        });
    });
    yield filters_1.default.deleteMany({});
    filters_1.default.insertMany(filters, (err) => {
        if (err) {
            logger_1.default.info(err);
            logger_1.default.info(err.message);
            logger_1.default.info('ERRRORRRRRR');
            response.status(400).end();
        }
        else {
            response.status(200).send(`Database filters seeded`);
        }
    });
}));
exports.default = FilterRouter;
