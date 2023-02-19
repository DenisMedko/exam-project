import React from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = (props) => {
  const { label, changeFocus, classes, isInputMask, mask, type } = props;
  const [field, meta] = useField(props.name);
  const { touched, error } = meta;
  const InputTag = isInputMask ? InputMask : 'input';
  const onFocus =
    field.name === 'sum' ? () => {} : () => changeFocus(field.name);
  const className = classNames(classes.input, {
    [classes.notValid]: touched && error,
  });
  return (
    <div className={classes.container}>
      <InputTag
        mask={mask}
        maskChar={null}
        {...field}
        placeholder={label}
        className={className}
        onFocus={onFocus}
        type={type}
      />
      {touched && error && (
        <span className={classes.error}>{error.message}!</span>
      )}
    </div>
  );
};

export default PayInput;
