import AEBaseComponent from '../../widgets/base/AEBaseComponent';
import React, { Component } from 'react';
import { Title, Content, Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base';
import AEContainer from '../../widgets/AEContainer';
import AEHeader from '../../widgets/AEHeader';
import AECard from '../aecard';
import { SceneRendererPropType } from './AETabViewPropTypes';

export default class AETabNavigator extends AEBaseComponent {

    static propTypes = {
        renderHeaderAndScene: React.PropTypes.func,
        renderFooter: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        this._onTabSelect=this._onTabSelect.bind(this);

    }

    _onTabSelect(index, key){
        console.log(" _onTabSelect setstate index, key", index, key)
        this.props.onTabActive(key);
        
    }

    _getUIFooterTabs() {
        if (this.props.uiCard) {
            let tabs = this.props.uiCard.uitabs.map(function (x, i) {
                return (<Button 
                            key={x.configObjectId} 
                            index={i}
                            active={this.props.activeTab && this.props.activeTab.configObjectId === x.configObjectId} 
                            onPress={() => this._onTabSelect(i, x.configObjectId)} >
                            {x.displayName}
                            <Icon name='ios-camera-outline' />
                        </Button>);
                }.bind(this));
                return (
                    <FooterTab>
                        {tabs}
                    </FooterTab>
                );

        }
        else
            return <FooterTab />;
    }

   

    render() {
        let headerandscene = this.props.renderHeaderAndScene();
        console.log("headerandscene length", headerandscene.length);

        return (
            <AEContainer>
                {headerandscene[0]}

                {headerandscene[1]}


                <Footer >
                    {this._getUIFooterTabs()}
                </Footer>

            </AEContainer>
        );
    }

}