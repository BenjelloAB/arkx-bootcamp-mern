/* eslint-disable react/prop-types */
import "./index.css"

export default function ContainerCard(props)
{
    return (
        <div className={props.cls}>{props.children}</div>
    );
}