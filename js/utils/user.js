
const privelgeLevels = {
    EDIT : 6,
    NOPRIVILEGE : 0,
    VIEW : 3,
}

export function hasReadPrivilege(privileges, roleId){
   let isPrivielege = false;
   privileges.forEach((p) => {
   let privLevel =  privelgeLevels[p.privilegeType] ? privelgeLevels[p.privilegeType] : 0 ;
   if(p.roldId == roleId && privLevel > privelgeLevels.NOPRIVILEGE)
    isPrivielege = true;
   });
   return isPrivielege;
}

export function hasWritePrivilege(privileges, roleId){
   let isPrivielege = false;
   privileges.forEach((p) => {
   if(p.roleId == roleId && privelgeLevels[p.privilegeType] > privelgeLevels.VIEW)
    isPrivielege = true;
   });
   return isPrivielege;
}