import { LoadingContainer, LoadingSpinner } from './loading-screen.styles';

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <p>Placing Booking...</p>
    </LoadingContainer>
  );
};

export default LoadingScreen;