import * as React from 'react';
import classNames from 'classnames';

import { Checkbox } from '../Checkbox';
import { CheckboxFieldProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared';
import { FieldErrorMessage } from '../Field';
import { Flex } from '../Flex';
import { useTestId } from '../utils/testUtils';

const CheckboxFieldPrimitive: Primitive<CheckboxFieldProps, 'input'> = (
  {
    className,
    errorMessage,
    hasError = false,
    labelHidden = false,
    labelPosition,
    testId,
    size,
    ...rest
  },
  ref
) => {
  const checkboxTestId = useTestId(testId, ComponentClassNames.Checkbox);
  return (
    <Flex
      className={classNames(
        ComponentClassNames.Field,
        ComponentClassNames.CheckboxField,
        size ? `${ComponentClassNames.Field}--${size}` : null,
        className
      )}
      data-size={size}
      testId={testId}
    >
      <Checkbox
        hasError={hasError}
        labelHidden={labelHidden}
        testId={checkboxTestId}
        labelPosition={labelPosition}
        ref={ref}
        {...rest}
      />
      <FieldErrorMessage hasError={hasError} errorMessage={errorMessage} />
    </Flex>
  );
};

export const CheckboxField = React.forwardRef(CheckboxFieldPrimitive);

CheckboxField.displayName = 'CheckboxField';
