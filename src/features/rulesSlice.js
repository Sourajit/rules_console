import { createSlice } from '@reduxjs/toolkit';
import produce from "immer";

var parseString = require('xml2js').parseString;
var jsonQ=require("jsonq");
var _state;
var xml = `<schema elementFormDefault="qualified" targetNamespace="http://www.webserviceX.NET">
      <element name="GetWeather">
        <complexType>
          <sequence>
            <element minOccurs="0" maxOccurs="1" name="CityName" type="string" />
            <element minOccurs="0" maxOccurs="1" name="CountryName" type="string" />
          </sequence>
        </complexType>
      </element>
      <element name="GetWeatherResponse">
        <complexType>
          <sequence>
            <element minOccurs="0" maxOccurs="1" name="GetWeatherResult" type="string" />
          </sequence>
        </complexType>
      </element>
      <element name="GetCitiesByCountry">
        <complexType>
          <sequence>
            <element minOccurs="0" maxOccurs="1" name="CountryName" type="string" />
          </sequence>
        </complexType>
      </element>
      <element name="GetCitiesByCountryResponse">
        <complexType>
          <sequence>
            <element minOccurs="0" maxOccurs="1" name="GetCitiesByCountryResult" type="string" />
          </sequence>
        </complexType>
      </element>
      <element name="age">
        <simpleType>
          <restriction base="integer">
            <minInclusive value="0"/>
            <maxInclusive value="120"/>
          </restriction>
        </simpleType>
      </element>
      <element name="letter">
      <simpleType>
        <restriction base="string">
          <pattern value="[a-z]"/>
        </restriction>
      </simpleType>
      </element>
    </schema>`;

parseString(xml, function (err, result) {
    _state= result;
    console.dir(_state);
});
const setNestedKey = (obj, path, value) => {
  if (path.length === 1) {
    obj[path] = value
    return
  }
  return setNestedKey(obj[path[0]], path.slice(1), value);
}

export const rulesSlice = createSlice({
  name: 'rules',
  initialState: {..._state},
  reducers: {
    updateElement: (state, action) => {
      //let _path = action.payload._path;
      let elementValue = Object.fromEntries(Object.entries(action.payload).filter((ele) => ele[0]!=='_path'));
      setNestedKey(state,action.payload._path,elementValue);
    }
  }
});

export const { updateElement } = rulesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
const primitiveTypes = ['string','decimal','integer','boolean','date','time'];
export const getElementList = state => jsonQ(state.rulesList).find('type',function(type){ return primitiveTypes.includes(this.valueOf())}).parent();

export const retrictionElementList = state => jsonQ(state.rulesList).find('restriction').jsonQ_current.map(
      (val)=> val.path.slice(0, val.path.indexOf('element')+2)).
      map((path)=> jsonQ(state).pathValue(path));

export const getElementByPath = (state,actions) => {
  debugger;
}

export default rulesSlice.reducer;
