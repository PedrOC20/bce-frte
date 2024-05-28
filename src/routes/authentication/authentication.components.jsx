import SignInForm from '../../components/sign-in-form/sign-in-form.components';

import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
    </AuthenticationContainer>
  );
};

export default Authentication;