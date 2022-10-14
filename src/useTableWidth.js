import React, { useEffect, useState } from "react";

const useTableWidth = () => {
  function GetIndex(element) {
    var aElements = element.parentNode.getElementsByTagName("th");
    var aElementsLength = aElements?.length;
    var index;
    for (var i = 0; i < aElementsLength; i++) {
      if (aElements[i] === element) {
        //this condition is never true
        index = i;
        return { indexOfElement: index, lengthOfColumns: aElementsLength };
      }
    }
  }

  const setContentWidth = (
    event,
    lengthOfColumns,
    indexOfElement,
    innerContentWidth
  ) => {
    //set current column label width
    event.target.firstChild.style.width = innerContentWidth;

    //set current column data width
    const rows = event.target.parentNode.parentNode.nextElementSibling.querySelectorAll(
      "tr"
    );
    for (var i = 0; i < rows.length; i++) {
      const rowElements = rows[i].querySelectorAll("td");
      if (rowElements.length === lengthOfColumns) {
        rowElements[indexOfElement].firstChild.style.width = innerContentWidth;
      }
    }
  };

  const mainActions = (event) => {
    const { lengthOfColumns, indexOfElement } = GetIndex(event.target);
    // event.target.classList.add("resize_activated");
    const innerContentWidth =
      parseInt(event.target.offsetWidth * 0.6, 10) + "px";
    setContentWidth(event, lengthOfColumns, indexOfElement, innerContentWidth);
  };

  const handleMouseDown = (event) => {
    if (event.target.nodeName === "TH") mainActions(event);
    return false;
  };

  const MouseDownHandle = (event) => {
    event.target.addEventListener("mousemove", handleMouseDown, true);
    event.target.addEventListener(
      "mouseup",
      () => {
        event.target.removeEventListener("mousemove", handleMouseDown, true);
        // event.target.classList.remove("resize_activated");
      },
      true
    );
    return false;
  };

  return [
    {
      MouseDownHandle
    }
  ];
};
export { useTableWidth };
