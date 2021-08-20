import PulseLoader from "react-spinners/PulseLoader";

function isLoadingHOC(WrappedComponent) {
  function HOC({ isLoading, ...props }) {
    return isLoading ? (
      <PulseLoader size={30} color={"#ff5136"} />
    ) : (
      <WrappedComponent {...props} />
    );
  }

  return HOC;
}

export default isLoadingHOC;
