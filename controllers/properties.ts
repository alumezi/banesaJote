import Express from 'express';
const PropertyRouter = Express.Router();
// const jwt = require('jsonwebtoken');

import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
import Property from '../models/property';
import logger from '../utils/logger';
// import { requireLogin } from '../utils/middleware';

PropertyRouter.get('/info', (request, response) => {
  Property.countDocuments({}).then((count) => {
    response.status(200).json({
      info: `Property has info for ${count} properties ${new Date()}`,
    });
  });
});

PropertyRouter.get('/', (request, response, next) => {
  // const { token } = request;
  // const decodedToken = jwt.decode(token, process.env.SECRET);

  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' });
  // }

  logger.info(
    '🚀 ~ file: properties.ts ~ line 32 ~ PropertyRouter.get ~ filters',
    request.query.filters
  );
  return Property.find(request.query.filters)
    .then((res) => {
      response.json(res);
    })
    .catch((err) => next(err));
});

// PropertyRouter.get('/api/persons/:id', (request, response, next) => {
//   Property.findById(request.params.id)
//     .then((res) => {
//       response.json(res);
//     })
//     .catch((err) => next(err));
// });

// PropertyRouter.delete('/api/persons/:id', (request, response, next) => {
//   Property.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((err) => next(err));
// });

// PropertyRouter.put('/api/persons/:id', requireLogin, (request, response, next) => {
//   Property.findByIdAndUpdate(
//     request.params.id,
//     { number: request.body.number },
//     { new: true, runValidators: true }
//   )
//     .then((updatedResource) => {
//       response.json(updatedResource);
//     })
//     .catch((error) => next(error));
// });

PropertyRouter.post(
  '/create',
  upload.array('photos', 6),
  (request, response, next) => {
    const resource = request.body;

    if (!resource.address) {
      return response.status(400).json({
        error: 'Address missing',
      });
    }

    if (!resource.neighborhood) {
      return response.status(400).json({
        error: 'Neighborhood missing',
      });
    }
    if (!resource.numberOfRooms) {
      return response.status(400).json({
        error: 'Number of rooms missing',
      });
    }
    if (!resource.size) {
      return response.status(400).json({
        error: 'Size missing',
      });
    }

    const PropertyEntry = new Property({
      date: new Date(),
      ...resource,
    });

    return PropertyEntry.save()
      .then((savedEntry) => {
        response.json(savedEntry);
      })
      .catch((error) => next(error));
  }
);

PropertyRouter.post('/seed', async (request, response) => {
  const properties = [
    {
      address: {
        road: 'Rr. Sali Ceku',
        number: '52',
      },
      neighborhood: 'Ulpiane',
      numberOfRooms: 2,
      features: ['terrace', 'Kitchen', 'wut?'],
      price: 200,
      size: 32,
      levelOfquietness: 1,
      amenities: ['wifi'],
      pictureUrls: [
        'https://firebasestorage.googleapis.com/v0/b/banesajote.appspot.com/o/photo-1522708323590-d24dbb6b0267.jpeg?alt=media&token=ecb27e9e-873e-4e58-ac82-b8371a4ad302',
      ],
    },
  ];

  await Property.deleteMany({});
  Property.insertMany(properties, (err) => {
    if (err) {
      response.status(400).end();
    } else {
      response.status(200).send(`Database properties seeded`);
    }
  });
});

export default PropertyRouter;
