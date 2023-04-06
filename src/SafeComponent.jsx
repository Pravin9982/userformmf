import React from "react";

export default class SafeComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error){
        return {hasError: true};
    }

    componentDidCatch() {}

    render(){
        if (this.state.hasError){
            return <h1> {console.log('safecomponent has been called')}There seems to be an issue</h1>
           
        }

        return this.props.children;
    }
}