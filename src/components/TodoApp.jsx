import React from 'react';

function ButtonEditar(props){
    return (
        <button onClick={props.onClick} className="editar">{props.value}</button>
    );
}
function ButtonExcluir(props){
    return (
        <button onClick={props.onClick} className="excluir">{props.value}</button>
    );
}

class ListItem extends React.Component{
    render(){
        return(
            <ul>
                {this.props.tks.map((task,index) => (
                <li key={index}>
                    <h1>{task.nameTask}</h1>
                    <p>{task.descTask}</p>
                    <div className="div-buttons">
                        <ButtonEditar onClick={() => this.props.update(index)} value={this.props.text} className="editar"/>
                        <ButtonExcluir onClick={() => this.props.delete(index)}  value="Exluir" className="exluir"/>
                    </div>
                </li>
                ))}
            </ul>
        ); 
    }
        
}

export default class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            valueInput: '',
            valueTextArea: '',
            tasks: [],
            id: 0,
        }
        this.valueButtonText = 'Editar';
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeId = this.changeId.bind(this);
        this.deleteL = this.deleteL.bind(this);
        this.updateL = this.updateL.bind(this);
    }
    deleteL(index){
        this.state.tasks.splice(index,1);
        this.setState({
            tasks: this.state.tasks,
        })
        console.log(this)
    }
    updateL(index){
        const task = this.state.tasks.splice(index,1);
        this.setState({
            valueInput: task[0].nameTask,
            valueTextArea: task[0].descTask,
        });

        if(this.state.valueInput === '' || this.state.valueTextArea === ''){
            alert('Nome da tarefa ou descrição inválidos')
        }
        
        task[0].nameTask = this.state.valueInput;
        task[0].descTask = this.state.valueTextArea;
        
        console.log(task[0])

        this.state.tasks.splice(index, 0,task[0]);
        this.setState({
            tasks: this.state.tasks,
        });
    }
    changeId(){
        this.setState({
            id: this.state.id + 1,
        })
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

        if(this.state.valueInput === '' || this.state.valueTextArea === ''){
            alert('Nome da tarefa ou descrição inválidos')
            return;
        }

        this.setState({
            tasks: this.state.tasks.concat({
                id: this.state.id,
                nameTask: this.state.valueInput,
                descTask: this.state.valueTextArea,
            }),
            valueInput: '',
            valueTextArea: '',   
        })
    }
    
    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="nome-tarefa">Nome: </label>
                    <input type="text" name="nome-tarefa" value={this.state.valueInput} onChange={this.handleChangeInput}/>
                    <label htmlFor="descricao-tarefa">Descrição da tarefa: </label>
                    <textarea name="descricao-tarefa" value={this.state.valueTextArea} onChange={this.handleChangeTextArea}/>
                    <button onClick={this.changeId}>Criar tarefa</button>
                </form>
                <div className="container-tasks">
                    <ListItem text={this.valueButtonText}delete={this.deleteL} update={this.updateL} tks={this.state.tasks}/>
                </div>
            </div>
        );
    }
}
