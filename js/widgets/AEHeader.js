/* @flow */
'use strict';

import React from 'react';
import { Platform} from 'react-native';
import AEBaseComponent from './base/AEBaseComponent';
import computeProps from '../utils/computeProps';
import { Button ,View ,Title ,InputGroup  }  from 'native-base';
import * as Subtitle  from './AESubtitle';
import _ from 'lodash';  
 
export default class Header extends AEBaseComponent {

    propTypes: {
        searchBar : React.PropTypes.bool,
        rounded : React.PropTypes.bool,
        style : React.PropTypes.object,
        iconRight: React.PropTypes.bool
    }

    getInitialStyle() {
        return {
            navbar: {
                backgroundColor: this.getTheme().toolbarDefaultBg,
                justifyContent: (!Array.isArray(this.props.children) && Platform.OS == 'ios') ? 'center' : 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: (!Array.isArray(this.props.children) && Platform.OS == 'android') ? 30 : undefined,
                paddingHorizontal: 15,
                paddingTop: (Platform.OS === 'ios' ) ? 15 : 0,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 1.5,
                height: this.getTheme().toolbarHeight,
                elevation: 3,
                position: 'relative'
            },
            iosToolbarSearch: {
                backgroundColor: this.getTheme().toolbarInputColor,
                borderRadius: this.props.rounded ? 25 : 2,
                height: 30,
                borderColor: 'transparent',
                flex:1
            },
            androidToolbarSearch: {
                backgroundColor: '#fff',
                borderRadius: 2,
                borderColor: 'transparent',
                elevation: 2,
                flex:1
            },
            toolbarButton: {
                paddingHorizontal: 15
            }
        }
    }

    prepareRootProps() {

        var defaultProps = {
            style: this.getInitialStyle().navbar
        };

        return computeProps(this.props, defaultProps);

    }
    renderChildren() {
        if(!Array.isArray(this.props.children)) {
            return this.props.children;
        }

        else if (Array.isArray(this.props.children)) {
            var newChildren = [];
            var childrenArray = React.Children.toArray(this.props.children);

            var buttons = [];
            buttons = _.remove(childrenArray, function(item) {
                if(_.get(item, 'type', null) == Button) {
                    return true;
                }
            });

            var title = [];
            title = _.remove(childrenArray, function(item) {
                if(_.get(item, 'type', null) == Title) {
                    return true;
                }
            });

            var subtitle = [];
            subtitle = _.remove(childrenArray, function(item) {
                if(_.get(item, 'type', null) == Subtitle) {
                    return true;
                }
            });

            var input = [];
            input = _.remove(childrenArray, function(item) {
                if(_.get(item, 'type', null) == InputGroup) {
                    return true;
                }
            });

            if (buttons.length == 1 && this.props.iconRight) {
                if (Platform.OS === 'ios') {
                    newChildren.push(<View key='title' style={{position: 'absolute', left: 0, right: 0, top: 13, bottom: 0, alignSelf: 'center', justifyContent: 'center'}}>
                    {[title[0],subtitle[0]]}
                    </View>)
                    newChildren.push(<View key='title2' style={{flex: 3, alignSelf: 'stretch'}} />)
                    newChildren.push(<View key='btn1' style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginRight: -14}}>
                    {React.cloneElement(buttons[0], {color: this.getTheme().iosToolbarBtnColor, style: this.getInitialStyle().toolbarButton})}
                    </View>)
                }
                else {
                    newChildren.push(<View key='title' style={{flex: 3, alignSelf: 'stretch', justifyContent: 'center'}}>
                    {[title[0]]}
                    </View>)
                    newChildren.push(<View key='btn1' style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: -10, marginRight: 12}}>
                    {React.cloneElement(buttons[0], {style: this.getInitialStyle().toolbarButton, header : true, textStyle: {color: this.getTheme().toolbarTextColor}})}
                    </View>)
                }
            }

            else if (this.props.searchBar) {
                if (Platform.OS === 'ios') {
                    newChildren.push(<View key='search' style={{flex: 1, alignSelf: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: -7}}>
                        {React.cloneElement(input[0],{style: this.getInitialStyle().iosToolbarSearch, toolbar : true, key : 'inp'})}
                        </View>)
                        newChildren.push(<View key='searchBtn' style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginRight: -14}}>
                        {React.cloneElement(buttons[0], {color: this.getTheme().iosToolbarBtnColor, style: this.getInitialStyle().toolbarButton})}
                        </View>)
                    } else {
                        newChildren.push(<View key='search' style={{flex: 1,alignSelf: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: -8, marginRight: -8}}>
                        {React.cloneElement(input[0],{style: this.getInitialStyle().androidToolbarSearch, atoolbar : true})}
                        </View>)

                         newChildren.push(<View key='searchBtn' style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row',  marginLeft: 2, marginRight: -14}}>
                        {React.cloneElement(buttons[0], { style: this.getInitialStyle().toolbarButton})}
                        </View>)
                    }
                }
                else if (buttons.length >= 1) {
                    if (Platform.OS === 'ios') {
                        newChildren.push(<View key='title' style={{position: 'absolute', left: 0, right: 0, top: 13, bottom: 0, alignSelf: 'center', justifyContent: 'center'}}>
                        {[title[0],subtitle[0]]}
                        </View>)
                        newChildren.push(<View key='btn1' style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: -14}}>
                        {React.cloneElement(buttons[0], {color: this.getTheme().iosToolbarBtnColor, style: this.getInitialStyle().toolbarButton})}
                        </View>)
                        newChildren.push(<View key='title2' style={{flex: 3, alignSelf: 'stretch'}} />)
                        if (buttons.length>1) {
                            for (let i = 1; i < buttons.length; i++) {
                                newChildren.push(<View key={'btn' + (i+1)} style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginRight: -14}}>
                                {React.cloneElement(buttons[i], {color: this.getTheme().iosToolbarBtnColor, style: this.getInitialStyle().toolbarButton})}
                                </View>)
                            }
                        }
                    }
                    else {
                        newChildren.push(<View key='btn1' style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: -10, marginRight: 12}}>
                        {React.cloneElement(buttons[0], {style: this.getInitialStyle().toolbarButton, header : true, textStyle: {color: this.getTheme().toolbarTextColor}})}
                        </View>)
                        newChildren.push(<View key='title' style={{flex: 3, alignSelf: 'stretch', justifyContent: 'center'}}>
                        {[title[0]]}
                        </View>)
                        for (let i = 1; i < buttons.length; i++) {
                            newChildren.push(<View key={'btn' + (i+1)} style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginRight: -7}}>
                            {React.cloneElement(buttons[i], {style: this.getInitialStyle().toolbarButton, header : true, textStyle: {color: this.getTheme().toolbarTextColor}})}
                            </View>)
                        }
                    }

                }
                else {
                  if (Platform.OS === 'ios') {
                      newChildren.push(<View key='title' style={{position: 'absolute', left: 0, right: 0, top: 13, bottom: 0, alignSelf: 'center', justifyContent: 'center'}}>
                      {[title[0],subtitle[0]]}
                      </View>)

                      if (childrenArray.length>1) {
                          for (let i = 1; i < childrenArray.length; i++) {
                              newChildren.push(<View key={'btn' + (i+1)} style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginRight: -14}}>
                              {React.cloneElement(childrenArray[i], {})}
                              </View>)
                          }
                      }
                  }
                  else {
                      newChildren.push(<View key='title' style={{flex: 3, alignSelf: 'stretch', justifyContent: 'center'}}>
                      {[title[0]]}
                      </View>)
                      for (let i = 1; i < childrenArray.length; i++) {
                          newChildren.push(<View key={'btn' + (i+1)} style={{alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginRight: -7}}>
                          {React.cloneElement(childrenArray[i], {})}
                          </View>)
                      }
                  }
                }
                return newChildren;
            }
        }

        render() {
            
            return(
            <View ref={c => this._root = c} {...this.prepareRootProps()} >
            {this.renderChildren()}
            </View>
        );
    }
}
