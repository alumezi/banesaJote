import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { classNames } from '../../util/class';
import { ErrorBoundary } from '../../../components/errorBoundary';
import './index.css';

export function Select({
  items,
  label,
  value,
  onChange,
  onBlur,
  defaultValue,
}: {
  items: { id: string; name: string }[];
  label?: string;
  value?: string | number;
  onChange?: any;
  onBlur?: any;
  defaultValue?: string | number;
}) {
  if (defaultValue && !value) {
    value = defaultValue;
  }
  return (
    <ErrorBoundary>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <div>
            <Listbox.Label className="listbox__label">{label}</Listbox.Label>
            <div className="listbox__body">
              <Listbox.Button className="listbox__button">
                <span className="listbox__button__container">
                  <span className="listbox__button__container__name">
                    {value}
                  </span>
                </span>
                <span className="listbox__icon__container">
                  <SelectorIcon
                    className="listbox__icon__container__icon"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                leave="listbox__transition--leave"
                leaveFrom="listbox__transition--leavefrom"
                leaveTo="listbox__transition--leaveto"
              >
                <Listbox.Options
                  static
                  className="listbox__options"
                  onBlur={onBlur}
                >
                  {items?.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        classNames(
                          active
                            ? 'listbox__option--active'
                            : 'listbox__option--inactive',
                          'listbox__option'
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="listbox__option__container">
                            <span
                              className={classNames(
                                selected
                                  ? 'listbox__option__container__name--selected '
                                  : 'listbox__option__container__name--unselected',
                                'listbox__option__container__name '
                              )}
                            >
                              {item.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active
                                  ? 'listbox__option__checkicon--active'
                                  : 'listbox__option__checkicon--inactive',
                                'listbox__option__checkicon'
                              )}
                            >
                              <CheckIcon
                                className="listbox__option__checkicon__icon"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </ErrorBoundary>
  );
}
