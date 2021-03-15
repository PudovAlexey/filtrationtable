import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import '../node_modules/ion-rangeslider/css/ion.rangeSlider.min.css'
import RangeSlider from "ion-rangeslider";

function SwitchColor() {

    let [colorPicker, setColorPicker] = useState({
        r: 255,
        g: 255,
        b: 255
    })

    useEffect(() => {

        $(".color-picker--red").ionRangeSlider({
            type: "single",
            min: 0,
            max: 255,
            from: colorPicker.g,
            onChange: function (data) {
                setColorPicker((prevState) => {

                    return { ...prevState, r: data.from }
                })
            },
        });

        $(".color-picker--green").ionRangeSlider({
            type: "single",
            min: 0,
            max: 255,
            from: colorPicker.g,
            onChange: function (data) {
                setColorPicker((prevState) => {

                    return { ...prevState, g: data.from }
                })
            },
        });

        $(".color-picker--blue").ionRangeSlider({
            type: "single",
            min: 0,
            max: 255,
            from: 255,
            onChange: function (data) {
                setColorPicker((prevState) => {

                    return { ...prevState, b: data.from }
                })
            },
        });

        // document.body.style.backgroundColor = `rgb(${colorPicker.r}, ${colorPicker.g}, ${colorPicker.b})`
        document.querySelector('.color__button--active').classList.contains('color__button--text') ? document.querySelector('.color__template').style.color = `rgb(${colorPicker.r}, ${colorPicker.g}, ${colorPicker.b})` : document.querySelector('.color__template').style.backgroundColor = `rgb(${colorPicker.r}, ${colorPicker.g}, ${colorPicker.b})` 


    })

    const buttonText = useRef(null);
    const buttonBackground = useRef(null);

    function switchColorHandler (cwitchedItem) {
        switch (cwitchedItem) {
            case 'text':
                buttonText.current.classList.add('color__button--active')
                buttonBackground.current.classList.remove('color__button--active')
                break;
                case 'background':
                    buttonText.current.classList.remove('color__button--active')
                    buttonBackground.current.classList.add('color__button--active')
                break;
        }

    }


    

    return (
        <div className="color">
            <div className="color__head">
                <span className="color__border-text">Select</span>
                <button className="color__button color__button--active color__button--text" ref ={buttonText}  onClick={() => switchColorHandler('text')}>color</button>
                <button className="color__button color__button--background" ref ={buttonBackground} onClick={() => switchColorHandler('background')}>background</button>
            </div>

            <div className="color__body">
                <div className="color__input-box">
                    <div className="range-slider range-slider--red"><input type="text" className="js-range-slider  color-picker--red" name="red_picker" value="" /></div>
                    <div className="range-slider range-slider--green"><input type="text" className="js-range-slider color-picker--green" name="green_picker" value="" /></div>
                    <div className="range-slider range-slider--blue"><input type="text" className="js-range-slider js-range-slider  color-picker--blue" name="blue_picker" value="" /></div>
                </div>
                <textarea className="color__template">"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"</textarea>
            </div >
        </div >
    )
}

export default SwitchColor