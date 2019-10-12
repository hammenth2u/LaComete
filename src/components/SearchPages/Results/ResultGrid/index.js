import React from 'react';

const ResultGrid = ({ results }) => {
            
    if({results} == []){        
        
        return (
            <div id="app">    
                
            </div>
        );
    } else {

        const resultData = results.map(result =>
            <div key={ result.id }>
                <p>{ result.title }</p>
                <p>{ result.category }</p>
                <p>{ result.location }</p>            
            </div>)

        return (
            <div id="app">    
            { resultData }
        </div>
        );
    }        
}
export default ResultGrid;