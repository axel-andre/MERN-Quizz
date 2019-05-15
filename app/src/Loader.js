import React, { Component } from 'react';
import * as animationData from '../src/assets/json/loader.json';
import Lottie from 'react-lottie';


class Loader extends Component{
    constructor(props) {
        super(props);
        this.state = {isStopped: false, isPaused: false};
      }

    render(){
          const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: animationData.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        return(
            <Lottie options={defaultOptions}
                        height={200}
                        width={200}
                        isStopped={this.state.isStopped}
                        isPaused={this.state.isPaused}/>
        )
    }

    
}
export default Loader;