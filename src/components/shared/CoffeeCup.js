import React from 'react';
import '../../styles/ui/CoffeeCup.css';
import mapIngToColor from '../../mapIngToColor';

const CoffeeCup = ({ ingredients, size }) => {
    if (!size) size = 100;

    const cup =  ingredients ? ingredients.map(({name, share}, index) => (
        <div className={`ingredient ${name}`} key={index} style={{
            height: `${share}%`,
            backgroundColor: mapIngToColor[name]
        }}></div>
    )) : null;

    return ( 
        <div className="cup-container" style={{
            marginLeft: Math.round(size * 22 / 100)
        }}>
            <div className="coffee-cup" style={{
                width: size,
                height: size,
                borderWidth: Math.round(size * 3 / 100)
            }}>
                { cup }
            </div>
            <div className="dec" style={{
                height: Math.round(size / 2),
                width: Math.round(size * 22 / 100),
                borderWidth: Math.round(size * 8 / 100),
                borderTopRightRadius: Math.round(size * 16 / 100),
                borderBottomRightRadius: Math.round(size * 16 / 100),
                marginTop: Math.round(size / 20)
            }}></div>
        </div>
     );
}
 
export default CoffeeCup;