export const subscribeToHash = (callback: () => void) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};

export const getHashSnapshot = () => window.location.hash.slice(1);
export const getServerHashSnapshot = () => '';
