import { useState } from 'react';
import { useFormik } from 'formik';
import { Select } from '../../../lib/components/select';
import { parseFeaturesInCurrentLanguage } from '../../../util/parsers/albanian';
import { Icon } from '../../../lib/components/icons';
import { FileUploader } from '../../../lib/components/file-uploader';
import { LockClosedIcon } from '@heroicons/react/solid';

export function PostFormComponent({
  handleCreatePropertySubmit,
  filterData = {},
}) {
  const [canSubmit, setCanSubmit] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.road) {
      errors.road = 'I nevojshëm';
    }
    if (!values.number) {
      errors.number = 'I nevojshëm';
    }
    if (!values.neighborhood) {
      errors.neighborhood = 'I nevojshëm';
    }
    if (!values.numberOfRooms) {
      errors.numberOfRooms = 'I nevojshëm';
    }
    if (!values.size) {
      errors.size = 'I nevojshëm';
    }
    if (!values.price) {
      errors.price = 'I nevojshëm';
    }
    if (values.pictures?.length < +values.numberOfRooms + 1) {
      errors.pictures = `Ju lutemi ngarkoni se paku ${
        +values.numberOfRooms + 1
      } fotografi`;
    }
    if (Object.keys(errors).length) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      road: '',
      number: '',
      neighborhood: '',
      numberOfRooms: '',
      size: '',
      price: '',
      amenities: [],
      features: [],
      pictures: [],
    },
    validate,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      let objectTOSave = {
        address: { road: values.road, number: values.number },
        neighborhood: values.neighborhood,
        numberOfRooms: values.numberOfRooms,
        size: values.size,
        amenities: values.amenities,
        features: values.features,
        price: values.price,
      };

      const formData = new FormData();
      Object.keys(objectTOSave).forEach((key) => {
        formData.append(key, JSON.stringify(objectTOSave[key]));
      });

      Array.from(values.pictures).forEach((item) => {
        formData.append('pictures', item);
      });
      await handleCreatePropertySubmit(values);
      setSubmitting(false);
      resetForm();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="h-full w-full">
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4 sm:col-span-4">
            <label
              htmlFor="road"
              className="block text-sm font-medium text-gray-700"
            >
              Rruga
            </label>
            <input
              id="road"
              name="road"
              type="text"
              placeholder="psh. Rruga Agim Ramadani"
              onChange={formik.handleChange}
              value={formik.values.road}
              onBlur={formik.handleBlur}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {formik.touched.road && formik.errors.road ? (
              <div className="default-input-validation">
                {formik.errors.road}
              </div>
            ) : null}
          </div>

          <div className="col-span-2 sm:col-span-2">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700"
            >
              Numër
            </label>
            <input
              id="number"
              name="number"
              type="number"
              placeholder="psh. 23"
              onChange={formik.handleChange}
              value={formik.values.number}
              onBlur={formik.handleBlur}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {formik.touched.number && formik.errors.number ? (
              <div className="default-input-validation">
                {formik.errors.number}
              </div>
            ) : null}
          </div>

          <div className="col-span-6 sm:col-span-4">
            <Select
              items={filterData.byLocation}
              label="Lokacioni"
              value={formik.values.neighborhood}
              onBlur={formik.handleBlur}
              onChange={(value) =>
                formik.setFieldValue('neighborhood', value.name)
              }
            />
            {formik.touched.neighborhood && formik.errors.neighborhood ? (
              <div className="default-input-validation">
                {formik.errors.neighborhood}
              </div>
            ) : null}
          </div>
          <div className="col-span-2 sm:col-span-2">
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700"
            >
              Çmimi
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="price"
                id="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                onBlur={formik.handleBlur}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="80"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                €
              </span>
            </div>
            {formik.touched.size && formik.errors.size ? (
              <div className="default-input-validation">
                {formik.errors.price}
              </div>
            ) : null}
          </div>
          <div className="col-span-6 sm:col-span-4">
            <Select
              items={filterData.byNumberOfRooms}
              label="Numëri i dhomave të gjumit"
              value={formik.values.numberOfRooms}
              onBlur={formik.handleBlur}
              onChange={(value) =>
                formik.setFieldValue('numberOfRooms', value.name)
              }
            />
            {formik.touched.numberOfRooms && formik.errors.numberOfRooms ? (
              <div className="default-input-validation">
                {formik.errors.numberOfRooms}
              </div>
            ) : null}
          </div>
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700"
            >
              Madhësia
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="size"
                id="size"
                onChange={formik.handleChange}
                value={formik.values.size}
                onBlur={formik.handleBlur}
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                placeholder="80"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                ㎡
              </span>
            </div>
            {formik.touched.size && formik.errors.size ? (
              <div className="default-input-validation">
                {formik.errors.size}
              </div>
            ) : null}
          </div>
          <div className="col-span-6 sm:col-span-3">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">
                Veçoritë
              </legend>
              <div className="mt-1 space-y-4 sm:p-2">
                {filterData.features.map((item) => (
                  <div className="flex items-start" key={item.id}>
                    <div className="flex items-center h-5">
                      <input
                        id={item.id}
                        name="features"
                        type="checkbox"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={item.name}
                        checked={formik.values.features.includes(item.name)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-gray-700">
                        {parseFeaturesInCurrentLanguage(item.name)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700">
                Pajisjet
              </legend>
              <div className="mt-1 space-y-4 sm:p-2">
                {filterData.amenities.map((item) => (
                  <div className="flex items-start" key={item.id}>
                    <div className="flex items-center h-5">
                      <input
                        value={item.name}
                        id={item.id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="amenities"
                        type="checkbox"
                        checked={formik.values.amenities.includes(item.name)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm inline">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700 inline-block"
                      >
                        <Icon
                          iconName={item.name}
                          className="h-5 w-5 mr-3 inline"
                        />
                        {parseFeaturesInCurrentLanguage(item.name)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="col-span-6 sm:col-span-6">
            <FileUploader
              files={formik.values?.pictures}
              handleBlur={formik.handleBlur}
              uploaderName="pictures"
              uploaderID="pictures"
              multiple={true}
              handleChange={(event) =>
                formik.setFieldValue('pictures', event.target.files)
              }
            />

            {formik.touched.pictures && formik.errors.pictures ? (
              <div className="default-input-validation">
                {formik.errors.pictures}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="sm:px-6 sm:pb-2">
        <button
          type="submit"
          cansubmit={canSubmit ? 'true' : 'false'}
          className="group relative w-full flex justify-center items-center py-5 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-green-600 group-hover:text-green-400 can-submit-icon"
              aria-hidden="true"
            />
          </span>
          Krijo
        </button>
      </div>
    </form>
  );
}
