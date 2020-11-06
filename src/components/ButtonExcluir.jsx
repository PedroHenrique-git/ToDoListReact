import React from 'react';

export default (props) => {
    return (
        <button onClick={props.onClick} className="excluir">{props.value}</button>
    );
}