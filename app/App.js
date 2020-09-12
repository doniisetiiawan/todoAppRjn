import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Heading from './Heading';
import Input from './Input';
import Button from './Button';
import TodoList from './TodoList';
import TabBar from './TabBar';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

let todoIndex = 0;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      todos: [],
      type: 'All',
    };
  }

  inputChange = (inputValue) => {
    console.log(' Input Value: ', inputValue);
    this.setState({ inputValue });
  };

  submitTodo = () => {
    const { inputValue, todos: todos1 } = this.state;
    if (inputValue.match(/^\s*$/)) return;
    const todo = {
      title: inputValue,
      todoIndex,
      complete: false,
    };
    todoIndex++;
    const todos = [...todos1, todo];
    this.setState({ todos, inputValue: '' }, () => {
      console.log('State: ', this.state);
    });
  };

  deleteTodo = (todoIndex) => {
    let { todos } = this.state;
    todos = todos.filter(
      (todo) => todo.todoIndex !== todoIndex,
    );
    this.setState({ todos });
  };

  toggleComplete = (todoIndex) => {
    const { todos } = this.state;
    todos.forEach((todo) => {
      if (todo.todoIndex === todoIndex) {
        todo.complete = !todo.complete;
      }
    });
    this.setState({ todos });
  };

  setType = (type) => {
    this.setState({ type });
  };

  render() {
    const { inputValue, todos, type } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={styles.content}
        >
          <Heading />
          <Input
            inputValue={inputValue}
            inputChange={(text) => this.inputChange(text)}
          />
          <TodoList
            type={type}
            toggleComplete={this.toggleComplete}
            deleteTodo={this.deleteTodo}
            todos={todos}
          />
          <Button submitTodo={this.submitTodo} />
        </ScrollView>
        <TabBar type={type} setType={this.setType} />
      </View>
    );
  }
}

export default App;
