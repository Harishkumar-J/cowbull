import React, { Component } from 'react';
import randomWords from "random-words";
import './App.css'

const SET_RANDOM_CHARACTER_LENGTH = 5

class App extends Component {
  main;
  constructor() {
    super();
    this.state = {
      word: "",
      cow: 0,
      attempts: 0,
      bull: 0
    };
  }
  // method 1
  componentDidMount() {
    let five_letter
    const duplicate = (five_letter) => {
      let c = 0;
      for (let i of five_letter) {
        if (five_letter.indexOf(i) === five_letter.lastIndexOf(i)) {
          c++;
        }
      }
      if (c === SET_RANDOM_CHARACTER_LENGTH) {
        return true
      }
      else {
        return false
      }
    }
    let p = 1;
    while (p) {
      five_letter = randomWords()
      if (five_letter.length === SET_RANDOM_CHARACTER_LENGTH) {
        if (duplicate(five_letter)) {
          this.main = five_letter;
          p = 0;
        }
      } else {
        five_letter = randomWords()
      }
    }
    //console.log(five_letter)
  }
  // method 2
  // componentDidMount(){
  //   let generateFiveCharater  = true
  //   let randomeWords
  //   while(generateFiveCharater){
  //     randomeWords = randomWords()
  //     if(randomeWords.length === SET_RANDOM_CHARACTER_LENGTH){
  //       let isDuplicate = false
  //       var characterCount = [...randomeWords].reduce((countObject, charcter) =>{
  //         countObject[charcter] = !isDuplicate ? (countObject[charcter] ? isDuplicate = true : 1) : null
  //         return countObject
  //       },{})
  //       if(isDuplicate === false){
  //         generateFiveCharater = false
  //       }
  //     }
  //   }
  //   console.log(randomeWords)
  // }
  handleChange = (event) => {
    this.setState(
      {
        word: event.target.value
      })
    this.setState({
      cow: 0,
      bull: 0,
    })
    event.preventDefault();
  };
  handleSubmit = (event) => {
    console.log(this.main)
    console.log(this.state.word)
    this.setState(prevState => {
      return { attempts: prevState.attempts + 1 }
    })
    let c = -1
    for (var i of this.state.word) {
      c = c + 1
      if (c === this.state.word.lastIndexOf(i)) {
        if (this.main.search(i) !== -1) {
          const a = this.main.search(i);
          // console.log(c)
          if (a === c) {
            this.setState(prevState => {
              return { cow: prevState.cow + 1 }
            })
          }
          else {
            this.setState(prevState => {
              return { bull: prevState.bull + 1 }
            })
          }
        }
      }
      else {
        alert("enter unique characters");
        this.setState(prevState => {
          return { attempts: prevState.attempts - 1 }
        })
        break;

      }
    }
    event.preventDefault();
  }
  render() {
    if (this.state.cow === SET_RANDOM_CHARACTER_LENGTH) {
      alert("Congrats!!")
    }
    return (
      <div className="Container">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter a Word"
            maxLength="5"
            minLength="5"
            value={this.state.word}
            onChange={this.handleChange}
          />
        </form>

        <pre>
          <img style={{ width: "130px" }} src="https://images.vexels.com/media/users/3/145611/isolated/preview/267af9cd2408e644b6781c51ee96930f-cow-playing-guitar-cartoon-by-vexels.png" alt="cow"></img>:{this.state.cow}  <img style={{ width: "130px" }} src="https://images.vexels.com/media/users/3/145506/isolated/preview/b5cd3c883c649e8d4b3ef51f08060aa3-bull-standing-cartoon-by-vexels.png" alt="bull"></img>: {this.state.bull}
        </pre>
        <p>Attempts:{this.state.attempts}<textarea rows="5" cols="30">{this.state.word}
        </textarea></p>



      </div>

    );
  }
}

export default App;