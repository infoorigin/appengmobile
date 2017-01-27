import { PropTypes } from 'react';



export const TabNavigationStateType = {
  index : PropTypes.number,
  key: PropTypes.string,
  
};

export const SceneRendererPropType = PropTypes.shape({
  tabNavigationState : TabNavigationStateType,
  uiTab: PropTypes.object,
});