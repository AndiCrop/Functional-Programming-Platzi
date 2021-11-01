const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

// función para trabajar con las clases de la etiqueta
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

// Función Compuesta para crear la etiqueta con la clase
const tagAttrs = obj => (content = "") => 
  `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

// función para crear la etiqueta
const tag = t => {
    if (typeof t === 'string') {
      tagAttrs({tag : t})
    } else{
      tagAttrs(t)
    }

}

//Función para crear filas que contiene las celdas
const tableRowTag = tag('tr')
// const tableRow = items => tableRowTag(tableCells(items))
const tableRow = items => compose(tableRowTag, tableCells)(items)

// función para construir celdas
const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join("")

//icono basura
const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('')

// Jquery para capturar info de inputs
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
  updateTotals();
  cleanInputs();
  renderItems();
  console.log(list);
}

const updateTotals = () =>{
  // crea un contador
  let calories = 0, carbs=0, protein = 0

  list.map(item =>{
    calories += item.calories,
    carbs += item.carbs,
    protein += item.proteins
  })

  //setear por Jquery
  $('#totalCalories').text(calories)
  $('#totalCarbs').text(carbs)
  $('#totalProteins').text(protein)
}

const cleanInputs = () => {
  description.val('')
  calories.val('')
  carbs.val('')
  proteins.val('')
}

const renderItems = () => {
  // limpiar body
  $('tbody').empty()

  list.map((item, index) => {
    // boton de eliminar
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)

    // método append agrega al final
    $('tbody').append(tableRow([item.description, item.calories, item.carbs, item.proteins, removeButton]))
  })
}

const removeItem = (index) => {
  list.splice(index, 1)

  updateTotals()
  renderItems()
}