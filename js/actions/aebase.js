
export function renderAndNavigate(actionType,configId, route) {
  return{
    type: actionType,
    configId: configId,
    navigationRoute : route
  };
}