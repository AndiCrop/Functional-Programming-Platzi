const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

  let description = $('#descripcion')
  let calories = $('#calorias')
  let carbs = $('#carboidratos')
  let proteins = $('#proteinas')

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
      console.log('ok');
    }

  }