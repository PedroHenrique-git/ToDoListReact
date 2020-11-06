import React from 'react';

export default (props) => {
    return (
        <button onClick={props.onClick} className="editar">{props.value}</button>
    );
}