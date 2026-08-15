import React from 'react';
import SelectSearch from 'react-select-search/dist/cjs';
import clsx from 'clsx';

import Label from 'components/UI/Label';
import FormControl from 'components/UI/FormControl';
import defaultClasses from 'components/UI/TheSelectSearch/default-style.module.css';

const defaultRenderOption = (domProps, option, _snapshot, className) => (
  <button
    type='button'
    className={className}
    {...domProps}>
    {option.name}
  </button>
);

const TheSelectSearch = React.forwardRef(({
  id,
  name,
  label,
  classes,
  renderOption = defaultRenderOption,
  renderGroupHeader = groupName => groupName,
  ...rest
}, ref) => (
  <>
    <FormControl>
      {label && <Label htmlFor={id}>{label}</Label>}
      <SelectSearch
        ref={ref}
        className={key => clsx(defaultClasses?.[key], classes?.[key])}
        {...rest}
        renderOption={renderOption}
        renderGroupHeader={renderGroupHeader}
        renderValue={valueProps => (
          <input
            id={id}
            name={name}
            className={clsx(defaultClasses?.['input'], classes?.['input'])}
            {...valueProps} />
        )} />
    </FormControl>
  </>
));

export default TheSelectSearch;
