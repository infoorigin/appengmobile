
import ModalPicker from 'react-native-modal-picker'

export default class AEDropdown extends Component {
  
  constructor(props) {
    super(props);
    this.state = { text: props.field.placeholder };
  }

  render() { 

    return (
                <View style={{flex:1, justifyContent:'space-around', padding:50}}>
                    <ModalPicker
                    data={data}
                    initValue="Select something yummy!"
                    onChange={(option)=>{ 
                        this.setState({lable:option.label, });
                        this.setState({textInputValue:option.label});
                        this.setState({textInputValue:option.label});
                    }}>
                    
                     <View>
                        <Text>{field.label}</Text>   
                        <InputGroup borderType='rounded'>
                            <Input 
                            
                            value={this.state.data[field.logicalColumn.jsonName]}
                            onBlur = {() => this._onInputBlur()}
                            onChangeText = {(text) => {this._onInputChange2(field.logicalColumn.jsonName, text);}}
                            />
                        </InputGroup>
                    </View>

                    </ModalPicker>
                </View>
    );
  }
}
