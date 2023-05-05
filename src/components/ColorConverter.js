import "./ColorConverter.css";
import { useState, useEffect } from "react";

//TODO change RGB input:
//don't run code if there's less than 2 commas
//insert a new comma when 3 numbers are given
//Not have cursor jump to the back

//Person should be able to delete commmas (don't stay in one "comma-field" when deleting numbers)
//Person should be able to write commas
//Person should be able to make space empty

//example:
//116,170,214 -> be able to delete to this: 116,17
//116,170,214 -> be able to delete to blank:  -> then start write: 15 (and not have it automatically filled with 0 or NaN)

function ColorConverter() {
  const [RGBValue, setRGBValue] = useState([116, 170, 214]);
  const [HEXValue, setHEXValue] = useState("#74aad6");
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["#ff0000", "#00ff00", "#0000ff"];

  //set RGB-value when you write in form
  function handleRGBChange(event) {
    const inputValues = event.target.value
      .split(",")
      .map(Number)
      .filter((value) => !isNaN(value) && value !== "")
      .map(RGBConverter);

    if (inputValues.length === 3) {
      const inputElement = event.target;
      const start = inputElement.selectionStart;
      setRGBValue(inputValues);
      setTimeout(() => {
        inputElement.setSelectionRange(start, start);
      }, 0);
    }
  }

  //set HEX-value when you write in form
  function handleHEXChange(event) {
    const inputValues = event.target.value;
    setHEXValue(inputValues);
  }

  //set HEX-value when RGB value change
  useEffect(() => {
    const HEXValues = RGBValue.map((element) => {
      const integerNumber = Math.trunc(element / 16);
      const decimalNumber = (element / 16 - integerNumber) * 16;
      return hexConverter(integerNumber) + hexConverter(decimalNumber);
    });
    const newHEXValue = "#" + HEXValues.join("");
    setHEXValue(newHEXValue);
  }, [RGBValue]);

  //set RGB-value when HEX change
  useEffect(() => {
    const RGBValues = hexToRgb(HEXValue);
    const newRGBValue = RGBValues.map((element) => {
      return RGBConverter(element);
    });
    setRGBValue(newRGBValue);
  }, [HEXValue]);

  //make RGB-value between 0-255
  function RGBConverter(value) {
    if (value > 255) {
      return 255;
    } else if (value < 0) {
      return 0;
    } else {
      return value;
    }
  }

  //calculate RGB-value from HEX
  function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return [r, g, b];
  }

  //Make numbers over 9 get a letter
  function hexConverter(value) {
    if (value === 10) {
      return "a";
    } else if (value === 11) {
      return "b";
    } else if (value === 12) {
      return "c";
    } else if (value === 13) {
      return "d";
    } else if (value === 14) {
      return "e";
    } else if (value === 15) {
      return "f";
    } else {
      return Math.round(value).toString(16);
    }
  }

  //change logo color
  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((colorIndex + 1) % colors.length);
    }, 8000);
    return () => clearInterval(intervalId);
  }, [colorIndex]);

  return (
    <div className="hueBox">
      <div className="logoContainer">
        <div
          className="logo"
          style={{ backgroundColor: colors[colorIndex] }}
        ></div>
        <h1>Huetility</h1>
      </div>
      <p>Enter a value to convert it to RGB or HEX.</p>
      <br />
      <form>
        <form className="converterContainer">
          <div className="input-wrapper">
            <label for="RGB">RGB</label>
            <input
              type="text"
              id="RGB"
              name="RGB"
              value={`${RGBValue}`}
              onChange={handleRGBChange}
            ></input>
          </div>
          <div className="input-wrapper">
            <label for="HEX">HEX</label>
            <input
              type="text"
              id="HEX"
              name="HEX"
              value={`${HEXValue}`}
              onChange={handleHEXChange}
            ></input>
          </div>
        </form>
      </form>
      <div
        className="colorBox"
        style={{ backgroundColor: `rgb(${RGBValue.join(",")})` }}
      ></div>
    </div>
  );
}

export default ColorConverter;
