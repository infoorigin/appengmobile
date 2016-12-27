export function getUser() {
  return{
    fname: 'fname',
    lname:'lname',
    currentRole:{name:'ADMIN', id:16},
    currentProject:{id:'0',name:'Application'},
    roles:[{name:'ADMIN', id:'0'}],
    projects:[{id:'0',name:'Application'}],
  }
}


const NO_PRIVILEGE = {}
const DEFAULT_PRIVILEGE = {privilegeType: "EDIT"}

export function getPrivilege(configObject){
    var user = getUser();
  
    if(configObject.priveleges){
      
      let userPrivileges = configObject.priveleges.filter(function(privilege){if(privilege.roldId == user.currentRole.id)return true;});
      if(userPrivileges.length>0){
        return Object.assign({}, userPrivileges[0]);
      }
      return NO_PRIVILEGE;

    }else{
       return DEFAULT_PRIVILEGE;
    }

   
}