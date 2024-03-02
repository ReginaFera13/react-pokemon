import "./poke.css";

function Poke ({key, name, typeA, typeB, sprite}) {
    const formattedName = name[0].toUpperCase() + name.slice(1);
    const types = (typeA, typeB) => {
        if (typeB !== false) {
            return `${typeA} type and ${typeB} type`;
        } else {
            return `${typeA} type`;
        }
    }; 


    return (
        <div key={key} className='pokeCard'>
            <div className='imgContainer'>
                <img src={`${sprite}`} alt={`${formattedName}`} />
            </div>
            <ul>
                <li className='name'>{formattedName}</li>
                <li className='types'>{types(typeA, typeB)}</li>
            </ul>
        </div>
    );
}

export default Poke;