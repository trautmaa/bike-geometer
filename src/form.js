import React from 'react';

class Form extends React.Component {

    // Add player function
    // addPlayer(e) {
    //     e.preventDefault();

    //     let wheelbase = this.wheelbase.value;

    //     console.log(wheelbase);

    //     // Empty our form
    //     this.addForm.reset();
    // }


    render(){
        console.log("form here")
        return(
            <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => { this.props.updateDimensions(e) }}>
                <input ref={input => this.wheelbase = input} type="number" placeholder="Wheelbase" />
                <button type="submit"><i className="fa fa-plus">Submit</i></button>
            </form>

        )
    }

}


// Must export!
export default Form;