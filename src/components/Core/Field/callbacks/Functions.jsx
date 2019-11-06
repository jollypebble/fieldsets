import React, { createContext, useMemo, useState } from 'react';
import { fetchFieldValue } from 'components/Core/utils';

// Our contexts.
export const FunctionsContext = createContext({});

export const Functions = (props) => {

  /**
   * Find numeric value of an input.
   * Will allow field id's and look up corresponding values
   * Will cast null values as 0.
   */
  const castNumeric = (value) => {
    let number = Number(value);
    if ( Number.isNaN(number) ) {
      // If we don't have a number, test to see if it is a cached field id
      const fieldvalue = fetchFieldValue(value);
      // Means we have a cache hit.
      if (fieldvalue !== null) {
        number = Number(fieldvalue);
        if ( Number.isNaN(number) ) {
          return Error(`Field ${value} has a value of ${fieldvalue} which cannot be cast to a number.`);
        }
      } else {
        return Error(`${value} cannot be cast to a number and is not a valid field id.`);
      }
    }
    return number;
  }

  /**
   * Check our type of field return corresponding numeric value.
   */
  const getNumericValue = (field, calledby = '') => {
    if (calledby.length > 0) {
      calledby = `function ${calledby}(): `;
    }
    switch ( typeof field ) {
      case 'numeric':
      case 'bigint':
      case 'string':
        try {
          return castNumeric(field);
        } catch (e) {
          console.error(`${calledby}Primitive value passed cannot be cast. ${e.message}`);
          return;
        }
        break;
      case 'function':
        const fieldvalue = field();
        try {
          return castNumeric(fieldvalue);
        } catch (e) {
          console.error(`${calledby}Function called returns an invalid value. ${e.message}`);
          return;
        }
        break;
      case 'object':
        if ( 'field' === field.__typename.toLowerCase() ) {
          if (field.value) {
            try {
              return castNumeric(field.value);
            } catch (e) {
              console.error(`${calledby}Field Object passed cotains an invalid value. ${e.message}`);
              return;
            }
          } else {
            try {
              throw new Error(`${calledby}Field Object passed does not have the value property.`);
            } catch (e) {
              console.error( e.message );
              return;
            }
          }
        } else {
          try {
            throw new Error(`${calledby}Object passed does not have the property __typename === 'field'.`);
          } catch (e) {
            console.error( e.message );
            return;
          }
        }
        break;
      default:
        try {
          throw new Error(`${calledby}Field of ${field} is not a valid data type and returns ${typeof field}`);
        } catch (e) {
          console.error( e.message );
          return;
        }
        break;
    }
  };


  /**
   * our default set of functions on our fields and their values.
   */
  const functions = useMemo(
    () => {
      return(
        {
          cast: (field, type) => {
            const lctype = type.toLowerCase()
            switch (lctype) {
              case 'number':
              case 'numeric':
              case 'num':
              case 'float':
              case 'int':
              case 'integer':
              case 'decimal':
              case 'currency':
                return getNumericValue(field, 'cast');
                break;
              case 'string':
              case 'char':
              case 'varchar':
              case 'text':
                return String(field);
                break;
              default:
                try {
                  throw new Error(`Function "cast": ${typeof type} is not a supported type for casting.`);
                } catch (e) {
                  console.error( e.message );
                  return field;
                }
                break;
            }
          },
          sum: (data) => {
            // Add all data values.
            if (data && data.length > 0) {
              let sum = 0;
              data.map( (field) => {
                const number = getNumericValue(field, 'sum');
                sum = sum + number;
              });
              return sum;
            }
          },
          diff: (data) => {
            // Will subtract remaining data values from first data value.
            if (data && data.length > 0) {
              let diff = getNumericValue(data[0], 'diff');
              data.slice(1).map( (field) => {
                const number = getNumericValue(field, 'sum');
                diff = diff - number;
              });
              return diff;
            }
          },
          avg: (data) => {
            // Returns the average of all data values.
            if (data && data.length > 0) {
              let sum = 0;
              let count = 0;
              data.map( (field) => {
                const number = getNumericValue(field, 'sum');
                sum = sum + number;
                count = count + 1;
              });
              return sum/count;
            }
          }
        }
      );
    },
    []
  );


  return (
    <FunctionsContext.Provider value={useState(functions)}>
      {props.children}
    </FunctionsContext.Provider>
  )
}
