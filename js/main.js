const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj) //obtiene las llaves del objeto
  const attrs = []

  for (let i=0; i<keys.length; i++){
    let attr = keys[i]
    attrs.push(`${attr}="${obj[attr]}"`)
  }

  const string = attrs.join('')
  return string
}

const tag = t => content => `<${t}>${content}</${t}>`

let description = $('#descripcion')
let calories = $('#calorias')
let carbs = $('#carboidratos')
let proteins = $('#proteinas')

let list =[]

description.keypress( () => {description.removeClass('is-invalid') });
calories.keypress( () => {calories.removeClass('is-invalid') });
carbs.keypress( () => {carbs.removeClass('is-invalid') });
proteins.keypress( () => {proteins.removeClass('is-invalid') });


const validateInputs = () =>{

  description.val() ? '' : description.addClass('is-invalid')
  calories.val() ? '' : calories.addClass('is-invalid')
  carbs.val() ? '' : carbs.addClass('is-invalid')
  proteins.val() ? '' : proteins.addClass('is-invalid')

  if( description.val() && calories.val() && carbs.val() && proteins.val() )
  {
    add();
  }

}

const add = () => {
  const newItem = {
    description : description.val(),
    calories : parseInt(calories.val()),
    carbs : parseInt(carbs.val()),
    proteins : parseInt(proteins.val())
  }

  list.push(newItem);
  cleanInputs();
  console.log(list);

}

const cleanInputs = () => {
  description.val('')
  calories.val('')
  carbs.val('')
  proteins.val('')
}