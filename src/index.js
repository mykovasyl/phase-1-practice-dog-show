document.addEventListener('DOMContentLoaded', () => {

  let dogCollection = [];
  let dogId;
  const table = document.querySelector('#table-body')
  const dogForm = document.querySelector('#dog-form')
  const nameInput = document.getElementsByName('name')

  function getRequest() {
    fetch('http://localhost:3000/dogs')
      .then(resp => resp.json())
      .then(data => {
        dogCollection = data
        renderDogs(dogCollection)
      })
  }//fetch ends

  getRequest();

  function renderDogs(dogCollection) {
    return table.innerHTML = dogCollection.map(renderDog).join('')
  }

  function renderDog(dog) {
    return `
    <tr>
      <td id="dog-name">${dog.name}</td>
      <td id="dog-breed">${dog.breed}</td>
      <td id="dog-sex">${dog.sex}</td>
      <td><button id="${dog.id}" name="edit-button">Edit</button></td>
    </tr>
    `
  }

  document.addEventListener('click', (e) => {
    if (e.target.name === 'edit-button') {
      dogId = e.target.id
      dogForm.name.value = e.target.parentNode.parentNode.children[0].textContent
      dogForm.breed.value = e.target.parentNode.parentNode.children[1].textContent
      dogForm.sex.value = e.target.parentNode.parentNode.children[2].textContent

    }
  })

  dogForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let dogUpdate = {
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value
    }
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(dogUpdate)
    })
      .then(resp => resp.json())
      .then(getRequest)
  })


})//code ends