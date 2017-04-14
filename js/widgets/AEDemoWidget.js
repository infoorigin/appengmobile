'use strict';

import React from 'react';
import { Text, View, ListView, StyleSheet, Button } from 'react-native';
import AEBaseWidget from './base/AEBaseWidget';
import { NavigationActions } from 'react-navigation';
import Tags from '../components/aetags';

export default class AEDemoWidget extends AEBaseWidget {
 constructor(props) {
        super(props);
        this.state = {
             tags: ["tag1","tag2"],
        }
      
    }

     onChangeTags = (tags) => {
    this.setState({
      tags,
    });
  };

    
    render() {
       console.log("Demo Widget2");
       const inputProps = {
            keyboardType: 'default',
            placeholder: 'email',
            autoFocus: false,
            };
        return (
            <View>
                  <Button
                onPress={() =>  this.props.dispatch(NavigationActions.navigate({ routeName: 'DrawerOpen' }))}
                title="Open drawer2"
                />

              <Text>DemTags4</Text>   
              
               
                <Tags 
                initialText=""
                initialTags={["tag1", "tag2"]}
                onChangeTags={(text) =>  console.log("tags changed ",text)}
                onTagPress={ (index, tagLabel, event) => console.log(index, tagLabel) }
                inputStyle={{ backgroundColor: 'white' }}
                />
           </View>         
        );
    }


}

