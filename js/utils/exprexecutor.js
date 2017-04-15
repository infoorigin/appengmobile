

const JAVASCRIPT_MODE = "JAVASCRIPT";
const LANG_DELIMINATOR = "$$";

export function resolveExpression(expression, data ){
   // return true is no expression is defined
   if( !expression)
    return true;
    // Only Support Javascript Code based expression
   if(expression.startsWith(JAVASCRIPT_MODE+LANG_DELIMINATOR)){
        const codeindex = expression.indexOf(LANG_DELIMINATOR)+2
        const jsexpression = expression.substring(codeindex);
        return executeJS(jsexpression, data);
   }
   else{
       return true;
   }

}

function executeJS(jsexpression, data ){
    try {
        const exprwithreturn = " return "+ jsexpression ;
        console.log("JS Exression Code :",exprwithreturn);
        const fnexp = new Function("input", exprwithreturn ) ;
        const result = fnexp(data) ;
        console.log("JS Exression Result :",result);
        return result;
    }
    catch(err) {
       console.log("Error : Invalid Javascript expression ",err);
       return true;
    }
    
}