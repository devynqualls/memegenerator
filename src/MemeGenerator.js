import React from 'react'
 
class MemeGenerator extends React.Component{
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }
     componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                
                this.setState({ allMemeImgs: memes })
            })
     }
     
     changeHandler(event){
           const {name, value} = event.target
        this.setState({ [name]: value })
     }
     
     submitForm(event){
         event.preventDefault()
          const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
             const randMemeImg = this.state.allMemeImgs[randNum].url
             this.setState({ randomImg: randMemeImg })
     }
    
    render() {
        return (
           <div>
            <form className="meme-form" onSubmit={this.submitForm}>
                <input 
                type="text" 
                name="topText" 
                placeholder="Input top text for meme"
                onChange={this.changeHandler}
                />
                <input 
                type="text" 
                name="bottomText" 
                placeholder="Input Bottom text for meme"
                onChange={this.changeHandler}
                />
            <br/>
            <button>Generate Meme</button>
           </form>
           <div className="meme" >
            <img src={this.state.randomImg} alt="random Meme Image" />
            <h2 className="top" >{this.state.topText}</h2>
            <h2 className="bottom" >{this.state.bottomText}</h2>
           </div>           
           
           </div>
        )
    }
    
}
export default MemeGenerator
