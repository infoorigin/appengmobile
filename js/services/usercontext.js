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


export const NO_PRIVILEGE = "NOPRIVILEGE";
export const VIEW_PRIVILEGE = "VIEW";
export const EDIT_PRIVILEGE = "EDIT";
const DEFAULT_PRIVILEGE = "EDIT";

export function getPrivilege(configObject, user){

  if(!user)  
    user = getUser();
  
   return getPrivilegeByUser(configObject, user);

   
}

function getPrivilegeByUser(configObject, user){

    if(configObject.priveleges){
      
      let userPrivileges = configObject.priveleges.filter(function(privilege){if(privilege.roldId == user.currentRole.id)return true;});
      if(userPrivileges.length>0){
        return userPrivileges[0].privilegeType;
      }
      return NO_PRIVILEGE;

    }else{
       return DEFAULT_PRIVILEGE;
    }

   
}

