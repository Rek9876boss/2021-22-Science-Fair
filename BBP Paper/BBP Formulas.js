function firstForm(n){
  var temp = 0;
  for(let i = 0; i < n; i++){
    temp = temp + ((1/(16^i))*((4/(8*i + 1))-(2/(8*i+4))-(1/(8*i+5))-(1/(8*i+6))));
  }
  return temp;
}
function secondForm(n){
  var temp = 0;
  for(let i = 0; i < n; i++){
    temp = temp + (((-1)^i)/(4^i))*((2/(4*i+1))+(2/(4*i+2))+(1/(4*i+3)));
  }
  return temp;
}
module.exports = {
  f1_2: firstForm,
  f1_9: secondForm,
}
