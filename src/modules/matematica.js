const PI = 3.14159265359;
const numeros =  ["dos", "cuatro", "ocho", "diez"];
const sumar = (num1, num2) => {return +(num1) + +(num2);}

const restar = (num1,num2) => {return +(num1) - +(num2);}

function multiplicar(num1,num2){return +(num1) * +(num2);}

function dividir(num1,num2){return +(num1) / +(num2);}

export {PI, numeros, sumar, restar, multiplicar, dividir};