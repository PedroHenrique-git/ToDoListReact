import React from 'react';
import ButtonEditar from './ButtonEditar';
import ButtonExcluir from './ButtonExcluir';

export default class ListItem extends React.Component{
    render(){
        return(
            <ul>
                {this.props.tks.map((task,index) => (
                <li key={index}>
                    <h1>{task.nameTask}</h1>
                    <p>{task.descTask}</p>
                    <div className="div-buttons">
                        <ButtonEditar onClick={() => this.props.update(index)} value="Editar" className="editar"/>
                        <ButtonExcluir onClick={() => this.props.delete(index)}  value="Exluir" className="exluir"/>
                    </div>
                </li>
                ))}
            </ul>
        ); 
    }
        
}