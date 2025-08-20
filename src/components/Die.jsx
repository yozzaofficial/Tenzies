export function Die(props){

    return (
        <button onClick={() => props.hold(props.id)} className={`dice ${props.isHeld && 'held'}`} >{props.value}</button>
    )
}