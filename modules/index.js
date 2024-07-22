console.log('Hello world!')

/*Modulos: são conjuntos de códigos.

3 tipos de módulos:
  NO NODE TODOS OS ARQIVOS JAVASCRIPT SÃO MÓDULOS;
  NATIVOS;
  npm (Node Package Manager);
*/

const {printName, lastName} = require ('./printName')

printName(`Martin ${lastName}`)
