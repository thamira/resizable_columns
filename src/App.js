import React, { useState, useEffect } from "react";
import "./styles.css";
import { Box, Table as MuiTable } from "@material-ui/core";
import { TableCell, TableHead, TableRow, TableBody } from "@material-ui/core";
import { useStyles } from "./styles";
import { useTableWidth } from "./useTableWidth";

export default function App() {
  const classes = useStyles();
  const [isResizing, setResizing] = useState(false);
  const [dragginIndex, setDraggingIndex] = useState(null);
  const [columnsOrder, setColumnsOrder] = useState([
    "name",
    "surname",
    "country",
    "city"
  ]);
  const columns = [
    {
      name: "name",
      id: 1
    },
    {
      name: "surname",
      id: 2
    },
    {
      name: "country",
      id: 3
    },
    {
      name: "city",
      id: 4
    }
  ];
  const users = [
    {
      id: 1,
      name: "name 1",
      surname: "surname 1",
      city: "Moscow",
      country: "Russia"
    },
    {
      id: 2,
      name: "name name name namenamename name",
      surname: "surname 2",
      city: "Colombo",
      country: "Sri-lanka"
    },
    {
      id: 3,
      name: "name 3",
      surname: "surname 3",
      city: "New Delhi",
      country: "India"
    }
  ];
  const getIndex = (event) => {
    const getParentIndex = (target) => {
      if (target.dataset.index === undefined) {
        return parseFloat(getParentIndex(target.parentElement));
      }
      return parseFloat(target.dataset.index);
    };
    return getParentIndex(event.target);
  };

  const DragEndHandle = (event) => {
    event.target.classList.remove("dragging");
    return false;
  };
  const onDragOverHandle = (event) => {
    event.preventDefault();
    return false;
    // console.log(event)
  };
  const OnDropHandle = (event) => {
    const dropIndex = getIndex(event);
    const columnsOrderCopy = [...columnsOrder];
    columnsOrderCopy.splice(dragginIndex, 1);
    columnsOrderCopy.splice(dropIndex, 0, columnsOrder[dragginIndex]);
    setColumnsOrder(columnsOrderCopy);
    // return false;
  };
  const buttonClickHandle = (event) => {
    console.log("button-working-", event.target.innerText);
  };

  const formatData = (user, column) => {
    return user[column.name];
  };

  const DragStartHandle = (event) => {
    if (isResizing) {
      event.preventDefault();
    } else {
      setDraggingIndex(event.target.dataset.index);
      return true;
    }
    // event.preventDefault();
    // event.target.classList.add("dragging");
    // return false;
  };

  const onRizerOnMouseDown = (event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();

      console.log(event);
    }
    // setResizing(true);
  };

  const onRizerOnMouseUp = (event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
      // console.log(event);
    }
    // setResizing(false);
  };
  // columns_width_change
  const [{ MouseDownHandle }] = useTableWidth();

  return (
    <Box>
      <MuiTable className={classes.table}>
        <TableHead>
          <TableRow>
            {columns
              .sort(
                (a, b) =>
                  columnsOrder.indexOf(a.name) - columnsOrder.indexOf(b.name)
              )
              .map((column, index) => (
                <TableCell
                  className={classes.cell}
                  draggable
                  onDragStart={DragStartHandle}
                  onDragEnd={DragEndHandle}
                  onDragOver={onDragOverHandle}
                  onDrop={OnDropHandle}
                  onMouseDown={MouseDownHandle}
                  key={column.name}
                  data-index={index}
                >
                  <Box className={classes.overflowWrapper}>
                    <button onClick={buttonClickHandle}>{column.name}</button>
                  </Box>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              {columns
                .sort(
                  (a, b) =>
                    columnsOrder.indexOf(a.name) - columnsOrder.indexOf(b.name)
                )
                .map((column) => {
                  return (
                    <TableCell key={column.name} className={classes.cell}>
                      <Box className={classes.overflowWrapper}>
                        {formatData(user, column)}
                      </Box>
                    </TableCell>
                  );
                })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </Box>
  );
}
