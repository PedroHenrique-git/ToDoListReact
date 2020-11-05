import React from 'react';

function ListItem(props){
    return (
        <ul>
          {props.tks.map(task => (
            <li>
                <h1>{task.nameTask}</h1>
                <p>{task.descTask}</p>
                <button className="editar">Editar tarefa</button>
                <button className="exluir">Exluir tarefa</button>
            </li>
          ))}
        </ul>
    );   
}

export default class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            valueInput: '',
            valueTextArea: '',
            tasks: [],
        }
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeInput(event){
        this.setState({
            valueInput: event.target.value, 
        });
    }
    handleChangeTextArea(event){
        this.setState({
            valueTextArea: event.target.value, 
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.setState({
            tasks: this.state.tasks.concat({
                nameTask: this.state.valueInput,
                descTask: this.state.valueTextArea,   
            })
        })
        console.log(this.state.tasks);
    }
    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="nome-tarefa">Nome: </label>
                    <input type="text" name="nome-tarefa" value={this.state.valueInput} onChange={this.handleChangeInput}/>
                    <label htmlFor="descricao-tarefa">Descrição da tarefa: </label>
                    <textarea name="descricao-tarefa" value={this.state.valueTextArea} onChange={this.handleChangeTextArea}/>
                    <button>Criar tarefa</button>
                </form>
                <div className="container-tasks">
                    <ListItem tks={this.state.tasks}/>
                </div>
            </div>
        );
    }
}
