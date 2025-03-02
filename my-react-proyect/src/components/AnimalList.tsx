function AnimalList() {
    const animales = [
        {
            id:1,
            name:"animal1"
        },
        {
            id:2,
            name:"animal2"
        }
    ];
    const htmlAnimales = animales.map((animal)=> {
        return (
            <li key={animal.id}> {animal.name}</li>
        )
    })
  return (
    <section>
        <h2>Animales: </h2>
        <ul>
            {htmlAnimales}
        </ul>
    </section>
  )
}

export default AnimalList