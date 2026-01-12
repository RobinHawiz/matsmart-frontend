function useDelay(delayInMilliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
}

export default useDelay;
