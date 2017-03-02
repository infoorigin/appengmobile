import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {RENDER_BASE_GRID} from '../../actions/grid';

const navitems = [
  {
    name: 'DashBoard',
    nav: 'DashBoard',
  },
  {
    name: 'Inbox',
    nav: 'Inbox',
  },
  {
    name: 'Draft',
    nav: 'Drafts',
    //path:'/schedule'
  },
]

const menu = [{
  configObjectId: "99be1f0b-f199-4a9c-ba72-53af9dbbbc98",
  displayLabel: "Task",
}, {
  configObjectId: "99be1f0b-f199-4a9c-ba72-53af9dbbbc98",
  displayLabel: "DummyTask",
}]

//this is the custom component i want to put in the drawer, can be any component of course
export default class DrawerContent extends Component {
  constructor(props) {
    super(props)
  }

  _buildMenu() {
    return menu.map((m, i) => {

      return (<TouchableOpacity key={"_buildMenu"+i} style={{ marginBottom: 0.5 }} onPress={() => {
        this.props.renderAndNavigate(RENDER_BASE_GRID,"37b97d48-00bc-428c-b2e9-3087f175c479","datagrid")
      }}>
        <View style={{ flexDirection: 'row', height: 50, paddingLeft: 15, backgroundColor: '#fff0', borderTopWidth: 0.5, borderColor: '#fff' }}>
          <Text style={{ fontSize: 36, color: '#fff' }}>{m.displayLabel}</Text>
        </View>
      </TouchableOpacity>)
    })
  }

  _staticMenu() {
    return navitems.map((l, i) => {

      return (<TouchableOpacity key={"_staticMenu"+i} style={{ marginBottom: 0.5 }} onPress={() => {
        this.props.navigation.navigate(l.nav)
      }
      }>
        <View style={{ flexDirection: 'row', height: 50, paddingLeft: 15, backgroundColor: '#fff0', borderTopWidth: 0.5, borderColor: '#fff' }}>
          <Text style={{ fontSize: 36, color: '#fff' }}>{l.name}</Text>
        </View>
      </TouchableOpacity>)
    })
  }

  render() {
    const allmenu = this._staticMenu().concat(this._buildMenu());
    console.log("Menu Size :", allmenu.length);
    console.log("Menu Props size ", this.props.menu.length);
    //<LogoHeader style={{marginBottom:15}} />
    //this is an imported component that has special header image stuff i want for the drawer. just drop it in
    //then make the list of navitems into buttons/links below
    return (<View style={{ borderWidth: 0, flex: 1, backgroundColor: '#aaa', marginTop: -20, paddingTop: 40 }}>

      <View>
        {allmenu}
      </View>
    </View>)
  }
}