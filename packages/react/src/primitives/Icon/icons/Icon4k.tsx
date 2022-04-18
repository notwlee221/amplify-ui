import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { Icon4k } from '@aws-amplify/ui-react';` → `import { Md4k } from 'react-icons/md';`
 */
export const Icon4k = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { Icon4k } from '@aws-amplify/ui-react'; → import { Md4k } from 'react-icons/md';`,
  });
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V5H19V19ZM9.5 15H11V13.51H12V12H11V9H9.5V12H8V9H6.5V13.5H9.5V15ZM18.2 15L16.2 12L18.2 9H16.5L14.5 12L16.5 15H18.2ZM14.5 12V9H13V15H14.5V12Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
