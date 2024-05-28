import './button.styles.jsx';

import { BaseButton, RetryButton } from './button.styles';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  retry: 'retry'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
  {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.retry]: RetryButton
  }[buttonType]
)

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton { ...otherProps }>{ children }</CustomButton>
};

export default Button;