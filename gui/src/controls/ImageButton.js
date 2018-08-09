import React from 'react';


function ImageButton(props) {
    return (
        <button>
            <img src={props.img} onClick={props.onClick} alt="alt!"/>
        </button>
     );
}

export default ImageButton;