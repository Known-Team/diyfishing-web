export function makeGreeting(displayName){
  let whiteSpaceIndex = displayName.indexOf(' ');
  if ( whiteSpaceIndex != -1 ){
    displayName = displayName.substr(0, whiteSpaceIndex);
  }
  return "Hello, " + displayName + ".";
}
